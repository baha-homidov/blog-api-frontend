import Header from "./Header";
import "../assets/styles/App.css";

import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
