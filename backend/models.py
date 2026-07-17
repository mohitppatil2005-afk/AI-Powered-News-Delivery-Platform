from database import db
from datetime import datetime

class Bookmark(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String, nullable= False)
    description = db.Column(db.Text)
    source = db.Column(db.String(100))
    url = db.Column(db.String(500), unique=True)
    image = db.Column(db.String(500))
    published_at = db.Column(db.String(50))
    category = db.Column(db.String(100))

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    description = db.Column(db.Text)
    source = db.Column(db.String(100))
    url = db.Column(db.String(500), unique=True, nullable=False)
    image = db.Column(db.String(500))
    published_at = db.Column(db.String(50))
    category = db.Column(db.String(100))

class ReadingHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500), nullable=False)
    description = db.Column(db.Text)
    source = db.Column(db.String(100))
    url = db.Column(db.String(500), unique=True, nullable=False)
    image = db.Column(db.String(500))
    published_at = db.Column(db.String(50))
    viewed_at = db.Column(db.DateTime, default=datetime.utcnow)
    category = db.Column(db.String(100))