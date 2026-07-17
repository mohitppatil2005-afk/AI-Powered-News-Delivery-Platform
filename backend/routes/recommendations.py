from flask import Blueprint, jsonify
from recommendation import recommend_articles
from dotenv import load_dotenv
import requests
import os

load_dotenv()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")

recommendation_bp = Blueprint("recommendations", __name__)


@recommendation_bp.route("/recommendations", methods=["GET"])
def get_recommendations():

    url = "https://newsapi.org/v2/top-headlines"

    categories = [
        "business",
        "entertainment",
        "health",
        "science",
        "sports",
        "technology"
    ]

    articles = []

    for category in categories:

        params = {
            "country": "us",
            "category": category,
            "pageSize": 10,
            "apiKey": NEWS_API_KEY
        }

        try:
            response = requests.get(url, params=params)
            data = response.json()

            for article in data.get("articles", []):
                articles.append({
                    "title": article.get("title"),
                    "description": article.get("description"),
                    "image": article.get("urlToImage"),
                    "url": article.get("url"),
                    "source": article.get("source", {}).get("name"),
                    "publishedAt": article.get("publishedAt"),
                    "category": category
                })

        except requests.RequestException as error:
            print(f"Error fetching {category} news:", error)

    recommendations = recommend_articles(
        articles,
        limit=10
    )

    return jsonify(recommendations)