import Welcome from "./Welcome";
import Title from "./Title";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
import "../assets/styles/MainPage.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function MainPage() {
  const [showLoader, setShowLoader] = useState(false);
  const [articleList, setArticleList] = useState([]);

  // GET with fetch API
  useEffect(() => {
    const fetchArticles = async () => {
      setShowLoader(true);
      const response = await fetch("http://localhost:8000");
      const data = await response.json();
      setShowLoader(false);
      data.map((item) => {
        return console.log(item);
      });

      setArticleList(data);
    };
    fetchArticles();
  }, []);

  return showLoader ? (
    <Loader />
  ) : (
    <div className="main-page">
      <Welcome />
      <div className="content">
        {articleList.map((item) => (
          <Link key={item._id} to={`article/${item._id}`}>
            <ArticleCard
              article={{
                title: item.title,
                text: item.text,
                timestamp: item.timestamp,
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
