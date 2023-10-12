import "../styles/LoginForm.css";
import React, { useState } from "react";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  const apiURL = "https://teacher-server-9cir.onrender.com";

  const handleValidateUser = (event) => {
    event.preventDefault();

    setUsernameError("");
    setPasswordError("");
    setValidationError("");

    if (!username.trim()) {
      setUsernameError("Username is required");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
    }

    fetch(`${apiURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherUsername: username,
        teacherPassword: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            if (data) {
              setValidationError(data.message);
            } else {
              setValidationError(
                "An error occurred while processing your request."
              );
            }
          });
        }
      })
      .then((data) => {
        if (data && data.teacherID) {
          navigate("/landingPage", { state: { teacherID: data.teacherID } });
          return data.teacherID;
        } else {
          console.error("ID could not be found.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="login-container">
        <div className="content">
          <div className="text">Login</div>
          <form className="loginForm" action="#" onSubmit={handleValidateUser}>
            <div>
              <span className="login--invalid">{validationError}</span>
            </div>
            <div className="login--field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                required
                id="username"
                name="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                  setUsernameError("");
                  setValidationError("");
                }}
              />
              <span className="login--invalid">{usernameError}</span>
              <span className="fas fa-user"></span>
            </div>
            <div className="login--field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                required
                id="password"
                name="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError("");
                  setValidationError("");
                }}
              />
              <span className="login--invalid">{passwordError}</span>
              <span className="fas fa-lock"></span>
            </div>
            <div className="forgot-pass"></div>
            <LoginButton handleValidateUser={handleValidateUser} />
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginForm;
