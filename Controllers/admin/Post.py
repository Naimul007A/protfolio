from app import app, LoginCheck, db
from flask import request, jsonify, render_template
from Models.Post import Post
from Models.Category import Category


@app.route("/admin/posts/", methods=["GET", "POST"])
def get_posts():
    if request.method == "POST":
        posts = Post.query.all()
        post_list = []
        for post in posts:
            post_list.append(
                {
                    "id": post.id,
                    "title": post.title,
                    "image": post.image,
                    "category": post.category.name,
                    "created_at": post.created_at,
                }
            )
        return jsonify(post_list)

    return LoginCheck("admin/post/home.html", "admin_login")


@app.route("/admin/posts/add/", methods=["GET", "POST"])
def add_post():
    if request.method == "POST":
        post = Post(
            title=request.form["postTitle"],
            description=request.form["postDec"],
            category_id=request.form["category"],
            is_live=request.form["isLive"],
            source_code=request.form["sourceCode"],
            image="null",
        )
        db.session.add(post)
        db.session.commit()
        return "1"

    categories = Category.query.all()
    return render_template("admin/post/addPost.html", categories=categories)


@app.route("/admin/posts/delete/<int:id>/", methods=["POST"])
def delete_post(id):
    if request.method == "POST":
        post = Post.query.filter_by(id=id).first()
        db.session.delete(post)
        db.session.commit()
        return "1"


@app.route("/admin/posts/edit/<int:id>/", methods=["GET", "POST"])
def edit_post(id):
    if request.method == "POST":
        post = Post.query.filter_by(id=id).first()
        post.name = request.form["skill_name"]
        post.experience = request.form["skill_exp"]
        post.category_id = request.form["skill_category"]
        db.session.add(skill)
        db.session.commit()
        return "1"
    skill = Post.query.filter_by(id=id).first()
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
