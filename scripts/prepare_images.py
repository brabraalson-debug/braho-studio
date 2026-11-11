"""Generate web derivatives without modifying source photographs or artwork."""
import argparse
import json
from pathlib import Path
from PIL import Image, ImageOps, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "static" / "images"
FILES = {
    "overview": "4d post.jpg",
    "crimson": "THE LAST PROPHECY Dark&Red.jpg",
    "rose": "THE LAST PROPHECY Pink&Green.jpg",
    "metal": "THE LAST PROPHECY colorless.jpg",
    "type": "THE LAST PROPHECY longTEXT.jpg",
}

def derivatives(image, name, widths):
    image = ImageOps.exif_transpose(image).convert("RGB")
    sizes = sorted({min(width, image.width) for width in widths})
    for width in sizes:
        resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
        resized.save(OUTPUT / f"{name}-{width}.webp", quality=86, method=6)
    fallback = image.copy()
    fallback.thumbnail((1000, 1600), Image.Resampling.LANCZOS)
    fallback.save(OUTPUT / f"{name}.jpg", quality=88, optimize=True)
    return {"width": image.width, "height": image.height, "sizes": sizes}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--portrait", type=Path, required=True)
    parser.add_argument("--artwork", type=Path, required=True)
    args = parser.parse_args()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = {}
    portrait = ImageOps.exif_transpose(Image.open(args.portrait))
    manifest["portrait"] = derivatives(portrait, "portrait", [480, 800, 1200, 1600])
    # A dedicated upper-body crop, retaining the face, shoulders and hands.
    mobile = portrait.crop((int(portrait.width * .10), int(portrait.height * .055),
                             int(portrait.width * .85), int(portrait.height * .66)))
    manifest["portrait-mobile"] = derivatives(mobile, "portrait-mobile", [480, 800, 1200])
    for name, file in FILES.items():
        with Image.open(args.artwork / file) as image:
            manifest[name] = derivatives(image, name, [480, 900, 1400, 2200, image.width])
    with Image.open(args.artwork / FILES["metal"]) as image:
        ornament = image.crop((int(image.width * .18), int(image.height * .12),
                              int(image.width * .82), int(image.height * .62)))
        manifest["ornament-detail"] = derivatives(ornament, "ornament-detail", [480, 900, 1400])
    with Image.open(args.artwork / FILES["type"]) as image:
        detail = image.crop((0, 0, image.width, int(image.height * .48)))
        manifest["type-detail"] = derivatives(detail, "type-detail", [480, 900, 1400])
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")

if __name__ == "__main__":
    main()
