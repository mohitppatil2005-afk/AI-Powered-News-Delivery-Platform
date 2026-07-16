import "./NewsCard.css";
import axios from "axios";

function NewsCard({ article, isBookmarkPage = false, onDelete, isLikePage = false, onUnlike}) {

    const handleBookmark = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/bookmarks",
                article
            );

            alert(response.data.message);
        } catch (error) {
            if (error.response?.status === 409) {
                alert("Article already bookmarked!");
            } else {
                alert("Failed to save bookmark.");
                console.error(error);
            }
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                `http://127.0.0.1:5000/bookmarks/${article.id}`
            );

            alert("Bookmark deleted!");

            if (onDelete) {
                onDelete();
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete bookmark.");
        }
    };

    const handleLike = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/likes",
                article
            );

            alert(response.data.message);
        } catch (error) {
            if (error.response?.status === 409) {
                alert("Article already liked!");
            } else {
                alert("Failed to like article.");
            }
        }
    };

    const handleUnlike = async () => {
        try {
            await axios.delete(
                `http://127.0.0.1:5000/likes/${article.id}`
            );

            if (onUnlike) {
                onUnlike();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="news-card">
            <div className="news-image">
                <img src={article.image} alt={article.title} />
            </div>

            <div className="news-info">
                <h3 className="news-title">{article.title}</h3>
                <p className="news-description">{article.description}</p>
            </div>

            <div className="news-button">
                <button
                    className="like"
                    onClick={isLikePage ? handleUnlike : handleLike}
                >
                    {isLikePage ? "💔" : "❤️"}
                </button>
                <button
                    className="bookmark"
                    onClick={isBookmarkPage ? handleDelete : handleBookmark}
                >
                    {isBookmarkPage ? "🗑️" : "🔖"}
                </button>

                <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="read-more"
                >
                    Read More
                </a>
            </div>
        </div>
    );
}

export default NewsCard;