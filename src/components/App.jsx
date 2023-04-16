import Header from "./Header";
import "../assets/styles/App.css";

import Footer from "./Footer";
import Loader from "./Loader";
import { Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import { useEffect, useState, useContext } from "react";
import isLoggedIn from "../utils/auth";

function App() {
  // Access the data from the context
  const { user, setUser } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      console.log("check");
      setShowLoader(true);
      const isLogged = await isLoggedIn();
      setUser(isLogged);
      setShowLoader(false);
    };
    checkUser();
  }, []);
  return (
    <div className="app">
      <h1>{user ? "Logged In" : "Not logged in"}</h1>

      <Header />
      <div className="content-wrapper">
        {showLoader ? <Loader /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
