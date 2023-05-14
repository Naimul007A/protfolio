from app import db
import datetime
from sqlalchemy import DateTime


class Category(db.Model):
    __tablename__ = "categorise"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    post_no = db.Column(db.Integer, default=0)
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
    posts = db.relationship("Post", backref="category")
