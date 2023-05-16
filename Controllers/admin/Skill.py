from app import app, LoginCheck, db
from flask import request, jsonify
from Models.Skill import Skill
from Models.Category import Category


@app.route("/admin/skills/", methods=["GET", "POST"])
def get_skill():
    if request.method == "POST":
        categories = Skill.query.all()
        skill_list = []
        for skill in categories:
            skill_list.append(
                {
                    "id": skill.id,
                    "name": skill.name,
                    "exprience": skill.experience,
                    "category": skill.scate.name,
                }
            )
        return jsonify(skill_list)

    return LoginCheck("admin/skill/home.html", "admin_login")


@app.route("/admin/skills/add/", methods=["GET", "POST"])
def add_skill():
    if request.method == "POST":
        skill = Skill(
            name=request.form["skill_name"],
            experience=request.form["skill_exp"],
            category_id=request.form["skill_category"],
        )
        db.session.add(skill)
        db.session.commit()
        return "1"

    categories = Category.query.all()
    category_list = []
    for category in categories:
        category_list.append(
            {
                "id": category.id,
                "name": category.name,
            }
        )
    return jsonify(category_list)


@app.route("/admin/skills/delete/<int:id>/", methods=["POST"])
def delete_skill(id):
    if request.method == "POST":
        skill = Skill.query.filter_by(id=id).first()
        db.session.delete(skill)
        db.session.commit()
        return "1"


@app.route("/admin/skills/edit/<int:id>/", methods=["GET", "POST"])
def edit_skill(id):
    if request.method == "POST":
        skill = Skill.query.filter_by(id=id).first()
        skill.name = request.form["skill_name"]
        skill.experience = request.form["skill_exp"]
        skill.category_id = request.form["skill_category"]
        db.session.add(skill)
        db.session.commit()
        return "1"
    skill = Skill.query.filter_by(id=id).first()
    skill_list = []
    skill_list.append(
        {
            "id": skill.id,
            "name": skill.name,
            "exprience": skill.experience,
            "category": skill.category_id,
        }
    )
    categories = Category.query.all()
    category_list = []
    for category in categories:
        category_list.append(
            {
                "id": category.id,
                "name": category.name,
            }
        )
    data = [{"categories": category_list, "skill": skill_list}]
    return jsonify(data)
