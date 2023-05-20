from app import db
import datetime
from sqlalchemy import DateTime


class Mail(db.Model):
    __tablename__ = "emails"
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(250), nullable=False)
    message = db.Column(db.Text)
    mail = db.Column(db.String(250), nullable=False)
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
