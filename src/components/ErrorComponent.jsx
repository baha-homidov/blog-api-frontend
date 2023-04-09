import { Link } from "react-router-dom";

function ErrorComponent() {
  return (
    <div className="error-component">
      <h1>An error has occured </h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default ErrorComponent;
