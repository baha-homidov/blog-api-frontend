import Welcome from "./Welcome";
import format from "date-fns/format";
import ErrorComponent from "./ErrorComponent";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
import "../assets/styles/MainPage.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function MainPage() {
  const [showLoader, setShowLoader] = useState(false);
  const [articleList, setArticleList] = useState([]);
  const [errorObj, setErrorObj] = useState(null);

  // GET with fetch API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setShowLoader(true);
        const response = await fetch("http://localhost:8000");
        const data = await response.json();
        data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setShowLoader(false);
        setArticleList(data);
      } catch (error) {
        console.log(error.status);
        setErrorObj({ message: error.message, status: error.status });
      }
    };
    fetchArticles();
  }, []);

  if (errorObj) {
    return <ErrorComponent error={errorObj} />;
  }

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
                timestamp: format(new Date(item.timestamp), "LLLL d, y"),
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
