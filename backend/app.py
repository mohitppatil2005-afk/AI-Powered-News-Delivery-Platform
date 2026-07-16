from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

from config import Config
from database import db
from models import Bookmark

load_dotenv()
NEWS_API_KEY=os.getenv("NEWS_API_KEY")

app= Flask(__name__)
CORS(app)

app.config.from_object(Config)
db.init_app(app)

@app.route("/")
def get_news():
    
    url = "https://newsapi.org/v2/top-headlines"

    category = request.args.get("category", "general")
    search= request.args.get("search", "")

    if search:
        url = "https://newsapi.org/v2/everything"

        params = {
            "q": search,
            "pageSize": 20,
            "sortBy": "publishedAt",
            "apiKey": NEWS_API_KEY
    }
    else:
        url = "https://newsapi.org/v2/top-headlines"

        params = {
            "country": "us",
            "category": category,
            "pageSize": 20,
            "apiKey": NEWS_API_KEY
        }

    response=requests.get(url, params=params)
    data=response.json()
    print(data)
    articles=[]
    for article in data.get("articles", []):
        articles.append({
            "title": article.get("title"),
            "description": article.get("description"),
            "image": article.get("urlToImage"),
            "url": article.get("url"),
            "source": article.get("source", {}).get("name"),
            "publishedAt": article.get("publishedAt")
        })
    return jsonify(articles)

@app.route("/bookmarks", methods=["POST"])
def add_bookmark():
    data = request.get_json()

    existing = Bookmark.query.filter_by(url=data.get("url")).first()

    if existing:
        return jsonify({
            "message": "Article already bookmarked!"
        }), 409

    bookmark = Bookmark(
        title=data.get("title"),
        description=data.get("description"),
        image=data.get("image"),
        url=data.get("url"),
        source=data.get("source"),
        published_at=data.get("publishedAt")
    )

    db.session.add(bookmark)
    db.session.commit()

    return jsonify({
        "message": "Bookmark saved successfully!"
    }), 201

@app.route("/bookmarks", methods=["GET"])
def get_bookmark():
    bookmarks = Bookmark.query.all()
    bookmarks_data=[]

    for bookmark in bookmarks:
        bookmarks_data.append({
            "id": bookmark.id,
            "title": bookmark.title,
            "description": bookmark.description,
            "image": bookmark.image,
            "url": bookmark.url,
            "source": bookmark.source,
            "publishedAt": bookmark.published_at
    })
    return jsonify(bookmarks_data)

if __name__=="__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)