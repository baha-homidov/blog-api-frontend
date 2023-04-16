import { useContext } from "react";
import isLoggedIn from "../utils/auth";
import AuthContext from "../context/AuthContext";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CommentCard(props) {
  // Access the data from the context
  const { user, setUser } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  async function deleteComment() {
    if (showLoader === true) {
      return;
    }

    setShowLoader(true);
    const isLogged = await isLoggedIn();

    if (isLogged) {
      try {
        setShowLoader(true);
        const response = await fetch(
          `http://localhost:8000/article/${props.comment.article_id}/comment/${props.comment._id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network error");
        }
        props.removeCommentFromLocalArray(props.comment._id);

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
    <div className="comment-card">
      <div className="card-header">
        <div className="title">{props.comment.author}</div>
        <div className="time">{props.comment.timestamp}</div>
      </div>
      <div className="text">{props.comment.text}</div>
      <button onClick={deleteComment} className="delete">
        {" "}
        {showLoader === true ? <Loader /> : "Delete"}
      </button>
    </div>
  );
}

export default CommentCard;
