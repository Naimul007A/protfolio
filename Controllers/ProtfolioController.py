from app import app
from flask import redirect, render_template, request


@app.route("/protfolio/")
def protfolio():
    return render_template("protfolio.html")


@app.route("/about_me/")
def about():
    return render_template("about.html")


@app.route("/contact_me/")
def contact():
    return render_template("contact.html")
