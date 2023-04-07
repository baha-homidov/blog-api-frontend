import CommentField from "./CommentField";
import Title from "./Title";
import CommentCard from "./CommentCard";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";

function ArticlePage(props) {
  const [showLoader, setShowLoader] = useState(true);
  const [articleData, setArticleData] = useState([]);

  const params = useParams();

  // GET with fetch API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setShowLoader(true);
        const response = await fetch(
          `http://localhost:8000/article/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setShowLoader(false);
        setArticleData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticles();
  }, []);

  return showLoader ? (
    <Loader />
  ) : (
    <div className="article-page">
      <h1 className="title">{articleData.article.title}</h1>
      <p>{articleData.article.text}</p>
      <CommentField />
      <Title title="Comments" />
      <div className="comments-container">
        {articleData.comments.length > 0 ? (
          <>
            {articleData.comments.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={{
                  author: comment.author,
                  timestamp: comment.timestamp,
                  text: comment.text,
                }}
              />
            ))}
          </>
        ) : (
          <h3>This article doesn't have any comments yet.</h3>
        )}
      </div>
    </div>
  );
}

export default ArticlePage;
