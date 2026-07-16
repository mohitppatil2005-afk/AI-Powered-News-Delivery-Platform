from flask import Blueprint, request, jsonify
from database import db
from models import Bookmark

bookmark_bp = Blueprint("bookmark", __name__)

@bookmark_bp.route("/bookmarks", methods=["POST"])
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

@bookmark_bp.route("/bookmarks", methods=["GET"])
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

@bookmark_bp.route("/bookmarks/<int:id>", methods=["DELETE"])
def delete_bookmark(id):
    bookmark = db.session.get(Bookmark, id)

    if not bookmark:
        return jsonify({
            "message": "Bookmark not found"
        }), 404

    db.session.delete(bookmark)
    db.session.commit()

    return jsonify({
        "message": "Bookmark deleted successfully"
    }), 200