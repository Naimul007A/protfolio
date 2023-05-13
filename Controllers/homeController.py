from app import app, db
from flask import redirect, render_template, request
from flask_login import login_required


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/services/")
@login_required
def service():
    return render_template("service.html")
