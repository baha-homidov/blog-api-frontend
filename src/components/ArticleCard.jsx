// component import
import Loader from "./Loader";

// context imort
import AuthContext from "../context/AuthContext";

// utilites import
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import isLoggedIn from "../utils/auth";

function ArticleCard(props) {
  // Access the data from the context
  const { user, setUser } = useContext(AuthContext);

  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate(); // navigate object to navigate the routes programmaticaly

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
          `https://blogapibackend.onrender.com/article/${props.article._id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network error");
        }

        // remove the article from the local array to prevent new fetch call and page reload
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
