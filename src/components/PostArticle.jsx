import Header from "./Header";
import "../assets/styles/App.css";

import Footer from "./Footer";
import Loader from "./Loader";

import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import isLoggedIn from "../utils/auth";

function PostArticle() {
  // Access the data from the context
  const { user, setUser } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  async function postArticle(event) {
    event.preventDefault();
    const articleData = {
      text: text.trim(),
      title: title.trim(),
    };

    const url = `http://localhost:8000/article/`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Replace with the correct content type for your API
      },
      body: JSON.stringify(articleData), // Convert data to JSON string
    };

    try {
      setShowLoader(true);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();

      setShowLoader(false);
      navigate(`/article/${data._id}`);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      console.log("check");
      setShowLoader(true);
      const isLogged = await isLoggedIn();
      setUser(isLogged);
      setShowLoader(false);
      if (!isLogged) {
        navigate("/");
      }
    };
    checkUser();
  }, []);

  if (showLoader) {
    return <Loader />;
  }

  return (
    <div className="post-article">
      <h1>Post Article</h1>
      <form onSubmit={postArticle} className="post-article-form">
        <label htmlFor="name">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value.replace(/^\s+/, ""))}
          type="text"
          name="name"
          id="name"
          required
        />

        <label htmlFor="comment">Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.replace(/^\s+/, ""))}
          type="text"
          id="comment"
          name="comment"
          required
        ></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default PostArticle;
