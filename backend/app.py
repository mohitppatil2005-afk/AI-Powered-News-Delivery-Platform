from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

load_dotenv()
NEWS_API_KEY=os.getenv("NEWS_API_KEY")

app= Flask(__name__)
CORS(app)

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

if __name__=="__main__":
    app.run(debug=True)