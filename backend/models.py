from database import db

class Bookmark(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String, nullable= False)
    source = db.Column(db.String(100))
    url = db.Column(db.String(500), unique=True)
    image = db.Column(db.String(500))
    published_at = db.Column(db.String(50))