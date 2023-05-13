from app import app
from flask import redirect, render_template, request, session, url_for
from flask_login import login_required


def LoginCheck(successURL, failedURL, data=""):
    if "logged_in" in session:
        return render_template(successURL, data=data)
    else:
        return redirect(url_for(failedURL))


def login_check():
    if "logged_in" in session:
        return True
    else:
        return False


@app.route("/admin/", methods=["GET", "POST"])
def admin_login():
    if "logged_in" in session:
        return redirect(url_for("admin_dashboard"))
    else:
        if request.method == "POST":
            return "hello"
        # session["logged_in"] = True
        return render_template("admin/login.html")


@app.route("/admin/dashboard/")
def admin_dashboard():
    data = "hello"
    return LoginCheck("admin/dashboard.html", "admin_login", data)


@app.route("/admin/logout/")
def admin_logout():
    session.clear()
    return redirect(url_for("admin_login"))
