"""Render the same Flask/Jinja pages for static Sites hosting."""
from pathlib import Path
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from app import app

def export():
    target = ROOT / "dist"
    if target.exists():
        shutil.rmtree(target)
    target.mkdir()
    shutil.copytree(ROOT / "static", target / "static")
    with app.test_client() as client:
        for route, file in [("/", "index.html"), ("/work/the-last-prophecy/", "work/the-last-prophecy/index.html"), ("/404", "404.html")]:
            response = client.get(route)
            expected = 404 if route == "/404" else 200
            if response.status_code != expected:
                raise RuntimeError(f"Cannot export {route}: {response.status_code}")
            output = target / file
            output.parent.mkdir(parents=True, exist_ok=True)
            output.write_bytes(response.data)
    print(f"Exported to {target}")

if __name__ == "__main__":
    export()
