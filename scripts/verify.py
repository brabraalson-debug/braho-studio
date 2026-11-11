"""Check rendered routes and local references through normal Flask entry points."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from app import app

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []
        self.ids = set()
        self.images = []
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"])
        if tag == "img":
            self.images.append(values)
        for key in ("href", "src"):
            if values.get(key):
                self.references.append(values[key])
        for candidate in values.get("srcset", "").split(","):
            if candidate.strip():
                self.references.append(candidate.strip().split()[0])

def verify():
    pages = {}
    with app.test_client() as client:
        for route in ("/", "/work/the-last-prophecy/"):
            response = client.get(route)
            assert response.status_code == 200, route
            parser = PageParser()
            parser.feed(response.get_data(as_text=True))
            pages[route] = parser
            for image in parser.images:
                assert "alt" in image, image
                if image.get("src"):
                    assert image.get("width") and image.get("height"), image
        checked = set()
        for route, page in pages.items():
            for ref in page.references:
                parsed = urlsplit(ref)
                if parsed.scheme or parsed.netloc:
                    continue
                path = parsed.path or route
                if path not in checked:
                    response = client.get(path)
                    assert response.status_code == 200, (route, ref, response.status_code)
                    checked.add(path)
                if parsed.fragment:
                    assert parsed.fragment in pages[path].ids, ref
        assert client.get("/missing-page").status_code == 404
    print(f"Verified {len(pages)} pages and {len(checked)} local routes/assets.")

if __name__ == "__main__":
    verify()
