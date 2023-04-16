import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import isLoggedIn from "../utils/auth";
import Loader from "./Loader";
function ArticleCard(props) {
  // Access the data from the context
  const { user, setUser } = useContext(AuthContext);

  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();

  async function deleteArticle() {
    if (showLoader === true) {
      return;
    }

    setShowLoader(true);
    const isLogged = await isLoggedIn();

    if (isLogged) {
      try {
        setShowLoader(true);
        const response = await fetch(
          `http://localhost:8000/article/${props.article._id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network error");
        }
        props.removeArticleFromLocalArray(props.article._id);

        setShowLoader(false);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    } else {
      setUser(false);
      navigate("/");
    }
  }

  console.log(props.article);
  return (
    <div className="article-card-wrapper">
      <Link className="link" to={`article/${props.article._id}`}>
        <div className="article-card">
          <div className="card-header">
            <div className="info">
              <h3 className="title">{props.article.title}</h3>
              <div className="time">{props.article.timestamp}</div>
            </div>
          </div>
          <div className="text">
            {props.article.text.length <= 150
              ? props.article.text
              : props.article.text.slice(0, 150)}
            ...
          </div>
        </div>
      </Link>
      {user && (
        <div className="admin-controls">
          <button onClick={deleteArticle} className="delete">
            {" "}
            {showLoader === true ? <Loader /> : "Delete"}
          </button>
          <Link to={`/article/${props.article._id}/edit`}>
            <button className="edit">Edit</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ArticleCard;
