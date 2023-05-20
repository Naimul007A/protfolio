from app import app
from flask import redirect, render_template, request, jsonify
from Models.Skill import Skill
from Models.Post import Post


@app.route("/protfolio/")
def protfolio():
    backend = Post.query.filter_by(category_id=1).order_by(Post.created_at.desc()).all()
    posts = Post.query.order_by(Post.created_at.desc()).all()
    frontend = (
        Post.query.filter_by(category_id=2).order_by(Post.created_at.desc()).all()
    )
    tools = Post.query.filter_by(category_id=3).order_by(Post.created_at.desc()).all()
    return render_template(
        "protfolio.html", backends=backend, frontends=frontend, tools=tools, posts=posts
    )


@app.route("/protfolio/show/<int:id>/", methods=["POST"])
def show_post(id):
    if request.method == "POST":
        post = Post.query.filter_by(id=id).first()
        post_list = []
        post_list.append(
            {
                "id": post.id,
                "title": post.title,
                "category": post.category.name,
                "desc": post.description,
                "isLive": post.is_live,
                "sourceCode": post.source_code,
                "image": post.image,
                "created": post.created_at,
            }
        )
        return jsonify(post_list)


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
