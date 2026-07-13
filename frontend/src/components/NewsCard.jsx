import "./NewsCard.css";

function NewsCard({ article }) {
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
                <button className="like">❤️</button>
                <button className="bookmark">🔖</button>

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