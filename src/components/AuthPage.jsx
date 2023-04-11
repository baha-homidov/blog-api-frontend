import { useState, useEffect } from "react";

function AuthPage() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  
  const register = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(response);
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const login = async () => {
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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      return null;
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
      console.log(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="auth-page">
      <div className="register">
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
      </div>

      <div className="login">
        <h1>Login</h1>
        <input
          placeholder="username"
          type="text"
          onChange={(e) => {
            setLoginUsername(e.target.value);
          }}
        />
        <input
          placeholder="password"
          type="text"
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button onClick={login}>Login</button>
      </div>
      <div className="get-user">
        <h1>Get user</h1>
        <button onClick={getUser}>Get User</button>
      </div>
    </div>
  );
}

export default AuthPage;
