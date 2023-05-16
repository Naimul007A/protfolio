from app import app
from flask import redirect, render_template, request
from Models.Skill import Skill


@app.route("/protfolio/")
def protfolio():
    return render_template("protfolio.html")


@app.route("/about_me/")
def about():
    backend = Skill.query.filter_by(category_id=1).all()
    frontend = Skill.query.filter_by(category_id=2).all()
    tools = Skill.query.filter_by(category_id=3).all()
    return render_template(
        "about.html", backend=backend, frontend=frontend, tools=tools
    )


@app.route("/contact_me/")
def contact():
    return render_template("contact.html")
