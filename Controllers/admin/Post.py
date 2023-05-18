from app import app, LoginCheck, db
from flask import request, jsonify, render_template, redirect, url_for
from Models.Post import Post
from Models.Category import Category
import uuid


@app.route("/admin/posts/", methods=["GET", "POST"])
def get_posts():
    if request.method == "POST":
        posts = Post.query.order_by(Post.created_at.desc()).all()
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
        if request.files["postImage"]:
            file = request.files["postImage"]
            # Generate a unique filename
            filename = str(uuid.uuid4()) + file.filename[file.filename.rfind(".") :]
            print(filename)
            file.save("static/uploads/" + filename)
        post = Post(
            title=request.form["postTitle"],
            description=request.form["postDec"],
            category_id=request.form["category"],
            is_live=request.form["isLive"],
            source_code=request.form["sourceCode"],
            image=filename,
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
        if request.files["postImage"]:
            file = request.files["postImage"]
            # Generate a unique filename
            filename = str(uuid.uuid4()) + file.filename[file.filename.rfind(".") :]
            print(filename)
            file.save("static/uploads/" + filename)
        else:
            filename = request.form["oldImage"]

        post = Post.query.filter_by(id=id).first()
        post.title = request.form["postTitle"]
        post.is_live = request.form["isLive"]
        post.description = request.form["postDec"]
        post.source_code = request.form["sourceCode"]
        post.category_id = request.form["category"]
        post.image = filename
        db.session.add(post)
        db.session.commit()
        return redirect(url_for("get_posts"))
    post = Post.query.filter_by(id=id).first()
    categories = Category.query.all()
    return render_template("admin/post/editPost.html", categories=categories, post=post)
