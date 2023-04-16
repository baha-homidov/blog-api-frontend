// Styles import
import "../assets/styles/App.css";

// Components import
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";

// Context import
import AuthContext from "../context/AuthContext";

// Utilites import
import { Outlet } from "react-router-dom";
import isLoggedIn from "../utils/auth";
import { useEffect, useState, useContext } from "react";

function App() {
  // Access the data from the context
  const { user, setUser } = useContext(AuthContext);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // check if user is logged and set the global state
    const checkUser = async () => {
      setShowLoader(true);
      const isLogged = await isLoggedIn();
      setUser(isLogged);
      setShowLoader(false);
    };
    checkUser();
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="content-wrapper">
        {showLoader ? <Loader /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
