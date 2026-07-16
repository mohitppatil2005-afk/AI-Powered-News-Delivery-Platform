import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import Navbar from "../components/Navbar";
import "./Bookmarks.css";

function Bookmark() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/bookmarks");
      setBookmarks(response.data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  return (
  <>
    <Navbar />

    <div className="bookmark-page">
      <h2 className="bookmark-title">My Bookmarks</h2>

      {bookmarks.length > 0 ? (
        <div className="bookmark-container">
          {bookmarks.map((article, index) => (
            <NewsCard key={index} article={article} isBookmarkPage={true} onDelete={fetchBookmarks}/>
          ))}
        </div>
      ) : (
        <div className="empty-bookmarks">
          No bookmarks yet.
        </div>
      )}
    </div>
  </>
  );
}

export default Bookmark;