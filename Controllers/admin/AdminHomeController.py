from app import app, LoginCheck, db
from flask import redirect, render_template, request, session, url_for, flash, jsonify
from Models import Admin
from Models.Mail import Mail


@app.route("/admin/", methods=["GET", "POST"])
def admin_login():
    if "logged_in" in session:
        return redirect(url_for("admin_dashboard"))
    else:
        if request.method == "POST":
            data = Admin.Admin.query.filter_by(
                user_name=request.form["userName"]
            ).first()
            if data:
                if data.password == request.form["password"]:
                    session["logged_in"] = True
                    return redirect(url_for("admin_dashboard"))
                else:
                    flash("User Name or Password Invalid!")
                    return redirect(url_for("admin_login"))

            else:
                flash("User Name or Password Invalid!")
                return redirect(url_for("admin_login"))

        return render_template("admin/login.html")


@app.route("/admin/dashboard/", methods=["GET", "POST"])
def admin_dashboard():
    if request.method == "POST":
        emails = Mail.query.order_by(Mail.created_at.desc()).all()
        email_list = []
        for email in emails:
            email_list.append(
                {
                    "id": email.id,
                    "email": email.mail,
                    "subject": email.subject,
                    "message": email.message,
                    "created_at": email.created_at,
                }
            )
        return jsonify(email_list)
    return LoginCheck("admin/dashboard.html", "admin_login")


# admin create
# @app.route("/admin/add_admin/")
# def admin_add():
#     admin = Admin.Admin(
#         name="Naimul islam",
#         user_name="naimul007a",
#         password="12345",
#         email="mdnaimul2090@gmail.com",
#     )
#     db.session.add(admin)
#     db.session.commit()
#     return "create admin"


@app.route("/admin/logout/")
def admin_logout():
    session.clear()
    return redirect(url_for("admin_login"))


@app.route("/admin/mail/delete/<int:id>/", methods=["POST"])
def delete_mail(id):
    if request.method == "POST":
        mail = Mail.query.filter_by(id=id).first()
        db.session.delete(mail)
        db.session.commit()
        return "1"
