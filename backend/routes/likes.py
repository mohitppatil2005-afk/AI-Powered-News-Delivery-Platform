from flask import Blueprint, request, jsonify
from database import db
from models import Like

like_bp = Blueprint("likes", __name__)


@like_bp.route("/likes", methods=["POST"])
def add_like():
    data = request.get_json()

    existing = Like.query.filter_by(url=data.get("url")).first()

    if existing:
        return jsonify({
            "message": "Article already liked!"
        }), 409

    like = Like(
        title=data.get("title"),
        description=data.get("description"),
        image=data.get("image"),
        url=data.get("url"),
        source=data.get("source"),
        published_at=data.get("publishedAt"),
        category=data.get("category")
    )

    db.session.add(like)
    db.session.commit()

    return jsonify({
        "message": "Article liked successfully!"
    }), 201


@like_bp.route("/likes", methods=["GET"])
def get_likes():

    likes = Like.query.all()

    likes_data = []

    for like in likes:
        likes_data.append({
            "id": like.id,
            "title": like.title,
            "description": like.description,
            "image": like.image,
            "url": like.url,
            "source": like.source,
            "publishedAt": like.published_at,
            "category": like.category
        })

    return jsonify(likes_data)


@like_bp.route("/likes/<int:id>", methods=["DELETE"])
def delete_like(id):

    like = db.session.get(Like, id)

    if not like:
        return jsonify({
            "message": "Like not found"
        }), 404

    db.session.delete(like)
    db.session.commit()

    return jsonify({
        "message": "Like removed successfully!"
    }), 200