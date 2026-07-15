import "./RecommendedCard.css";

function RecommendedCard({ article }) {
    return (
        <div className="recommended-card">
            <img
                src={article.image}
                alt={article.title}
                className="recommended-image"
            />

            <div className="recommended-content">
                <h4 className="recommended-heading">
                    {article.title}
                </h4>

                <p className="recommended-source">
                    {article.source}
                </p>

                <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="recommended-link"
                >
                    Read →
                </a>
            </div>
        </div>
    );
}

export default RecommendedCard;