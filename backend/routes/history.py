from flask import Blueprint, request, jsonify
from database import db
from models import ReadingHistory
from datetime import datetime

history_bp = Blueprint("history", __name__)

@history_bp.route("/history", methods=["POST"])
def save_history():
    data = request.json

    existing = ReadingHistory.query.filter_by(url=data["url"]).first()

    if existing:
        existing.viewed_at = datetime.utcnow()
        db.session.commit()
        return jsonify({"message": "History updated"})

    article = ReadingHistory(
        title=data["title"],
        description=data.get("description"),
        source=data.get("source"),
        url=data["url"],
        image=data.get("image"),
        published_at=data.get("publishedAt"),
        category= data.get("category")
    )

    db.session.add(article)
    db.session.commit()

    return jsonify({"message": "Added to history"})

@history_bp.route("/history", methods=["GET"])
def get_history():

    history = ReadingHistory.query.order_by(
        ReadingHistory.viewed_at.desc()
    ).all()

    return jsonify([
        {
            "id": item.id,
            "title": item.title,
            "description": item.description,
            "source": item.source,
            "url": item.url,
            "image": item.image,
            "publishedAt": item.published_at,
            "viewed_at": item.viewed_at,
            "category": item.category
        }
        for item in history
    ])