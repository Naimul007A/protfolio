from app import app, LoginCheck, db
from flask import request, jsonify
from Models.Category import Category


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
