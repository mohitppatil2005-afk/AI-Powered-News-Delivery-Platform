import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import "./History.css";

function History() {
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/history");
            setHistory(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <>
            <Navbar />

            <div className="history-container">
                <h1 className="history-title">Reading History</h1>

                {history.length === 0 ? (
                    <p className="no-history">
                        You haven't read any articles yet.
                    </p>
                ) : (
                    <div className="history-grid">
                        {history.map((article) => (
                            <NewsCard
                                key={article.id}
                                article={article}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default History;