import { useState, useEffect, useContext } from "react";

import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../utils/auth";
import AuthContext from "../context/AuthContext";

function AuthPage() {
  const navigate = useNavigate();

  // Access the data from the context

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorObj, setErrorObj] = useState(null);

  const { user, setUser } = useContext(AuthContext);

  // const [registerUsername, setRegisterUsername] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");

  // const register = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/auth/register", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: registerUsername,
  //         password: registerPassword,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // };

  useEffect(() => {
    async function userCheck() {
      setShowLoader(true);
      const isLogged = await isLoggedIn();
      setUser(isLogged);
      setShowLoader(false);
    }
    userCheck();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      if (!response.ok) {
        setErrorObj({ message: "Network response was not ok" });
      }

      const data = await response.json();
      if (data.response === "success") {
        setInvalidPassword(false);
        setUser(true);

      } else {
        setInvalidPassword(true);
      }
    } catch (error) {
      console.error("Error:", error); // Handle any errors that occurred during the request
      setErrorObj({ message: error.message, status: error.status });
    }
  };

  const logout = async () => {
    try {
      setShowLoader(true);
      const response = await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        setErrorObj({ message: "Network response was not ok" });
      }

      setUser(false);
      setShowLoader(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/getuser", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data !== null && Object.keys(data).length !== 0) {
        setUser(true);
      } else {
        setUser(false);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  if (errorObj !== null) {
    return <ErrorComponent error={errorObj} />;
  }

  if (showLoader) {
    return <Loader />;
  }

  if (user) {
    return (
      <div className="auth-page">
        <h1 className="greetings">Hello Admin</h1>
        <button onClick={logout} className="log-out">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <h1 className="title">Login as an Admin</h1>
      <form className="login" onSubmit={login}>
        <label htmlFor="username">Username</label>
        <input
          required
          id="username"
          type="text"
          placeholder="username"
          onChange={(e) => {
            setLoginUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          id="password"
          placeholder="password"
          type="password"
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
        {invalidPassword && (
          <div className="invalid-password">Invalid Password</div>
        )}
      </form>
    </div>
  );
}

export default AuthPage;

/* <div className="register">
        <h1>Register</h1>
        <input
          placeholder="username"
          type="text"
          onChange={(e) => {
            setRegisterUsername(e.target.value);
          }}
        />
        <input
          placeholder="password"
          type="text"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div> */
