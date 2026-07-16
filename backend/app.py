from flask import Flask
from flask_cors import CORS


from config import Config
from database import db

app= Flask(__name__)
CORS(app)

app.config.from_object(Config)
db.init_app(app)

from routes.news import news_bp
from routes.bookmarks import bookmark_bp
from routes.likes import like_bp

app.register_blueprint(news_bp)
app.register_blueprint(bookmark_bp)
app.register_blueprint(like_bp)

from models import Bookmark, Like

if __name__=="__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)