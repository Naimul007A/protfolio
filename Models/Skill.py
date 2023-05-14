from app import db
import datetime
from sqlalchemy import DateTime


class Skill(db.Model):
    __tablename__ = "skills"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    experience = db.Column(db.String(250))
    category_id = db.Column(db.Integer, db.ForeignKey("categorise.id"))
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
