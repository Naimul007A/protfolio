from app import app, db
from flask import redirect, render_template, request


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/services/")
def service():
    return render_template("service.html")
