"""Flask routes and shared content for the Braho Studio portfolio."""
import json
from datetime import datetime
from pathlib import Path
from flask import Flask, render_template
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent
app = Flask(__name__)

@app.context_processor
def site_context():
    data = json.loads((ROOT / "content.json").read_text())
    images = json.loads((ROOT / "static/images/manifest.json").read_text())
    return {
        "site": data,
        "images": images,
        "copyright_year": datetime.now(ZoneInfo("Europe/Athens")).year,
    }

@app.get("/")
def home():
    return render_template("home.html", page="home")

@app.get("/work/the-last-prophecy/")
def project():
    return render_template("project.html", page="project")

@app.errorhandler(404)
def not_found(error):
    return render_template("404.html", page="error"), 404

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8765)
