import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <h1>
        <Link to="/">Blog API</Link>
      </h1>
    </div>
  );
}

export default Header;
