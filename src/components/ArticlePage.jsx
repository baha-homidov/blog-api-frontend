import Title from "./Title";
import CommentCard from "./CommentCard";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import format from "date-fns/format";
import { useParams } from "react-router-dom";

function ArticlePage(props) {
  const [showLoader, setShowLoader] = useState(true);
  const [articleData, setArticleData] = useState([]);
  const [errorObj, setErrorObj] = useState(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [showCommentLoader, setShowCommentLoader] = useState(false);

  const params = useParams();

  // GET with fetch API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setShowLoader(true);

        const response = await fetch(
          `http://localhost:8000/article/${params.id}`
        );

        const data = await response.json();
        // Sort the comments in descending order
        data.comments.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        console.log(data.comments);
        if (!response.ok) {
          throw new Error(data.error, { status: 404 });
        }
        setShowLoader(false);
        setArticleData(data);
      } catch (error) {
        console.log(error.status);
        setErrorObj({ message: error.message, status: error.status });
      }
    };
    fetchArticles();
  }, []);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentData = {
      author: name.trim(),
      text: text.trim(),
    };

    const url = `http://localhost:8000/article/${params.id}/comment`; // Replace with your endpoint URL
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Replace with the correct content type for your API
      },
      body: JSON.stringify(commentData), // Convert data to JSON string
    };

    try {
      setShowCommentLoader(true);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      setShowCommentLoader(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error); // Handle any errors that occurred during the request
      setErrorObj({ message: error.message, status: error.status });
    }
  };

  if (errorObj !== null) {
    return <ErrorComponent error={errorObj} />;
  }

  return showLoader ? (
    <Loader />
  ) : (
    <div className="article-page">
      <h1 className="title">{articleData.article.title}</h1>
      <p>{articleData.article.text}</p>
      {!showCommentLoader ? (
        <div className="comment-field">
          <div className="label">Write a comment</div>
          <form onSubmit={handleCommentSubmit}>
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value.replace(/^\s+/, ""))}
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
      ) : (
        <Loader />
      )}
      <Title title="Comments" />
      <div className="comments-container">
        {articleData.comments.length > 0 ? (
          <>
            {articleData.comments.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={{
                  author: comment.author,
                  timestamp: format(new Date(comment.timestamp), "LLLL d, y"),
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
