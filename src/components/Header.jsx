import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
function Header() {
  // Access the data from the context
  const { user, setUser } = useContext(AuthContext);

  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();

  async function logout() {
    if (showLoader === true) {
      return;
    }
    try {
      setShowLoader(true);
      const response = await fetch("https://blogapibackend.onrender.com:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network error");
      }

      setUser(false);
      setShowLoader(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="header">
      <h1>
        <Link to="/">Blog API</Link>
      </h1>
      {user && (
        <div className="admin-controls">
          <Link to="/article/new-post">
            <button className="new-post">New Post</button>
          </Link>
          <button onClick={logout} className="log-out">
            {showLoader === true ? <Loader /> : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
