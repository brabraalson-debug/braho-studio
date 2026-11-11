# Braho Studio

A portrait-led portfolio and a dedicated page for The Last Prophecy. Built with Flask, Jinja, CSS, and browser JavaScript. The supplied portrait and artwork are preserved in their original locations. This project includes web derivatives.

## Run locally

Python 3.9 or newer is required.

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python app.py
```

Open http://127.0.0.1:8765/. The project page is at /work/the-last-prophecy/. The Flask development server is intended for local use. For a Python production deployment, use a WSGI host with entry point `app:app`.

## Edit the portfolio

Edit `content.json` for the headline, descriptions, practice areas, project metadata, and contact details. The practice descriptions are draft positioning based on the supplied artwork.

Set `contact.email` to the email you want to publish. Add social entries to `contact.socials`, each with a `label` and an absolute HTTPS `url`. With both fields empty, the contact section displays an explicit preview notice and emits no email or social links.

The archive edition is 2027. The footer copyright year is computed in the Europe/Athens timezone when Flask renders the page or the static version is exported. Re-export the static deployment when the year changes.

## Files

- `app.py` defines the Flask routes and loads shared content.
- `content.json` contains editable portfolio content.
- `templates/` contains the semantic HTML and Jinja components.
- `static/css/` contains shared styles and page compositions.
- `static/js/site.js` adds menu, lightbox, pointer, and navigation enhancements.
- `static/images/` contains responsive WebP files, JPEG fallbacks, outlined marks, and image metadata.
- `static/fonts/` contains self-hosted fonts and their SIL Open Font Licenses.
- `scripts/prepare_images.py` regenerates responsive image derivatives.
- `scripts/export_static.py` renders the Flask pages for static hosting.
- `scripts/verify.py` checks routes, local links, and assets.

## Image preparation

Pillow creates proportional WebP derivatives and JPEG fallbacks. Full-composition gallery files retain the source proportions and embedded lettering. The artwork viewer loads a derivative at the original pixel dimensions only when selected. The mobile portrait has a separate upper-body crop. The Studio portrait is uncropped. The CSS darkening around the hero affects its environment, with no face retouching or synthesized details.

```sh
python scripts/prepare_images.py \
  --portrait "/Users/braho/Downloads/DSCF3715.jpg" \
  --artwork "/Users/braho/Desktop/BRAHO STUDIO/WORK/MEDIEVAL/"
```

The two detail images are clearly presented as details. `ornament-silhouette.png` is a thresholded graphic derivative of the ornament detail, used decoratively during the project entrance.

## Logo inspection

BRAHO STU LOGOV1.svg is the provisional studio mark. It contains vector paths and no font dependency. Its web derivative has a tighter viewBox and ivory fill.

L2.svg contains a separate wing-like path symbol. It is presented as a symbol exploration.

L3.svg contains live SXC text referencing ManifoldExtdCF-Regular. L3333333.ai is a PDF-compatible Illustrator file showing the SXC experiment with that font embedded. The included SXC web derivative was exported from that file with text converted to paths using PyMuPDF 1.26.5. It has no runtime font dependency. The original SVG and AI files were preserved.

## Typography and dependencies

Barlow Condensed SemiBold supplies the display typography. Instrument Sans supplies body copy. Both come from the Google Fonts repository and are distributed under the SIL Open Font License. License files are included. Courier New and monospace are system fallbacks for metadata. All fonts are served locally.

Flask 3.1.2 provides routing and Jinja templates. Pillow 11.3.0 provides image conversion. No JavaScript libraries or graphics engine are required.

## Accessibility and motion

Native links and scrolling work without JavaScript. The menu enhances the fallback navigation only when native dialogs are supported. Dialogs trap focus, support Escape, and return focus to their trigger. Gallery images link directly to full-size optimized files when the lightbox is unavailable.

Pointer effects are limited to fine pointers and respect prefers-reduced-motion. The reduced-motion rules remove heading reveals, parallax, magnetic movement, and view-transition animation. Project previews expose a permanent action label, including on touch devices. There is no canvas dependency.

Cross-document shared-image transitions are progressive browser enhancements. Browsers without support use an ornamental transition and ordinary page navigation. Browser Back uses native scroll restoration. Explicit return links also restore the saved home position after the main preview is used.

## Verify and export

```sh
python scripts/verify.py
python scripts/export_static.py
```

The existing Sites deployment hosts the generated `dist/` directory. Flask remains the editable local/server implementation. Re-run the export after changing templates, content, styles, scripts, or assets. Sites currently serves the generated pages without executing Python.

The contact details remain pending.

## Verification completed

Both pages were checked at viewport widths of 375, 768, 1024, and 1440 pixels. The checks covered horizontal overflow, desktop and mobile portrait crops, original poster aspect ratios, menu focus containment, Escape, the artwork viewer, browser Back, and visible touch-target dimensions.

A separate script-free rendering was used to check fallback navigation. Reduced-motion CSS was forced in that rendering to verify static headings, disabled transforms, and native instant scrolling. Physical touch hardware and an operating-system reduced-motion setting were not exercised.

The final home-to-project-to-home browser pass reported no warnings or errors. Flask verification resolved both pages and 55 local asset/routes references. Main text colours exceed a 4.5:1 contrast ratio against their intended solid backgrounds. Font files use WOFF2 compression, and full-resolution poster derivatives load on demand.
