import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import "./Bookmarks.css";

function Likes() {
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        fetchLikes();
    }, []);

    const fetchLikes = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/likes");
            setLikes(response.data);
        } catch (error) {
            console.error("Error fetching likes:", error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="bookmark-page">
                <h2 className="bookmark-title">Liked Articles</h2>

                {likes.length > 0 ? (
                    <div className="bookmark-container">
                        {likes.map((article) => (
                            <NewsCard
                                key={article.id}
                                article={article}
                                isLikePage={true}
                                onUnlike={fetchLikes}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-bookmarks">
                        No liked articles yet.
                    </div>
                )}
            </div>
        </>
    );
}

export default Likes;