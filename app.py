from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

# create the app
app = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///protfolio.db"
app.config["SECRET_KEY"] = "thisisascecretkey"
# create the extentiom
db = SQLAlchemy(app)
app.app_context().push()


def __repr__(self) -> str:
    return f"{self.id}- {self.title}"


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user():
    return "hello"


from Controllers import *
from Controllers.admin import *
