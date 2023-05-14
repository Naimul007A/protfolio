from flask import Flask, redirect, render_template, session, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate


# create the app
app = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///protfolio.db"
app.config["SECRET_KEY"] = "thisisascecretkey"
# create the extentiom
db = SQLAlchemy(app)
app.app_context().push()
migrate = Migrate(app, db)


def __repr__(self) -> str:
    return f"{self.id}- {self.title}"


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


def LoginCheck(successURL, failedURL, data=""):
    if "logged_in" in session:
        return render_template(successURL, data=data)
    else:
        return redirect(url_for(failedURL))


@login_manager.user_loader
def load_user():
    return "hello"


from Controllers import *
from Controllers.admin import *
from Models import *
