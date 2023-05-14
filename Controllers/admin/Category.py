from app import app, LoginCheck, db
from flask import redirect, render_template, request, session, url_for, flash, jsonify
from Models.Category import Category
import json


class CategoryEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Category):
            return {
                "id": obj.id,
                "name": obj.name,
                "post_no": obj.post_no,
                "created_at": obj.created_at,
            }
        return super().default(obj)


app.json_encoder = CategoryEncoder


# kaj kore nah ata oh dekhsi ami
@app.route("/admin/categorise/", methods=["GET", "POST"])
def get_categories():
    if request.method == "POST":
        categories = Category.query.all()
        category_list = []
        for category in categories:
            category_list.append(
                {"id": category.id, "name": category.name, "post_no": category.post_no}
            )
        return jsonify(category_list)

    return LoginCheck("admin/category/home.html", "admin_login")


@app.route("/admin/categorise/add/", methods=["POST"])
def add_category():
    if request.method == "POST":
        category = Category(name=request.form["cate_name"])
        db.session.add(category)
        db.session.commit()
        return "1"


@app.route("/admin/categorise/delete/<int:id>/", methods=["POST"])
def delete_category(id):
    if request.method == "POST":
        category = Category.query.filter_by(id=id).first()
        db.session.delete(category)
        db.session.commit()
        return "1"


@app.route("/admin/categorise/edit/<int:id>/", methods=["GET", "POST"])
def edit_category(id):
    if request.method == "POST":
        category = Category.query.filter_by(id=id).first()
        category.name = request.form["cate_name"]
        db.session.add(category)
        db.session.commit()
        return "1"
    category = Category.query.filter_by(id=id).first()
    category_list = []
    category_list.append({"id": category.id, "name": category.name})
    return jsonify(category_list)
