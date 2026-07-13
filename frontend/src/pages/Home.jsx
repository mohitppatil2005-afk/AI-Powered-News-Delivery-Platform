import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import "./Home.css";

function Home() {
  const [news, setNews]=useState([]);

  async function fetchNews() {
    try{
      const url='http://127.0.0.1:5000/news';
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
  }, [])


  return (
    <>
    <Navbar/>
    
    <div className="news-container">
      {news.map((article, index) => (
          <NewsCard key={index} article={article} />
      ))}
    </div>

    </>
  );
}

export default Home;