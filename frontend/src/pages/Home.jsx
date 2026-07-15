import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import Category from "../components/Category";
import "./Home.css";

function Home() {
  const [news, setNews]= useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchQuery, setSearchQuery]= useState("");
  const [searchInput, setSearchInput]= useState("");
  const [recommendedNews, setRecommendedNews] = useState([]);

  async function fetchNews() {
    try{
      const url=`http://127.0.0.1:5000/?category=${selectedCategory}&search=${searchQuery}`;
      const response= await fetch(url);
      const data=await response.json();
      setNews(data);
    } 
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchNews();
  }, [selectedCategory, searchQuery])

  function handleCategoryChange(category){
    setSelectedCategory(category);
    setSearchInput("");
    setSearchQuery("");
  }


  return (
    <>
    <Navbar
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      setSearchQuery={setSearchQuery}
    />

    <Category
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
    />
    
    <div className="news-container">
      {news.map((article, index) => (
          <NewsCard key={index} article={article} />
      ))}
    </div>

    </>
  );
}

export default Home;