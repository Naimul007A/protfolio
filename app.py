from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# create the app
app = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///protfolio.db"
# create the extentiom
db = SQLAlchemy(app)
app.app_context().push()


def __repr__(self) -> str:
    return f"{self.id}- {self.title}"


from Controllers import *
