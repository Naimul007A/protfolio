from app import db
import datetime
from sqlalchemy import DateTime


class Post(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    description = db.Column(db.Text)
    category_id = db.Column(db.Integer, db.ForeignKey("categorise.id"))
    is_live = db.Column(db.String(250))
    source_code = db.Column(db.String(250))
    image = db.Column(db.String(250))
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
