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
      setUsernameError("Enter a username");
    }

    if (!password.trim()) {
      setPasswordError("Enter a password");
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
        <div>
          <h2 className="subheading">Support Allocation Form</h2>
        </div>
        <div className="content">
          <div className="login--header">
            <h2>Login</h2>
          </div>
          <form className="loginForm" action="#" onSubmit={handleValidateUser}>
            <div className="center-align">
              <span className="login--invalid">{validationError}</span>
            </div>
            <div className="field login--field">
              <label htmlFor="username"></label>
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
                placeholder="Username"
              />
              <span className="fas fa-user"></span>
            </div>
            <div className="left-align">
              <span className="login--invalid">{usernameError}</span>
            </div>
            <div className="field login--field">
              <label htmlFor="password"></label>
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
                placeholder="Password"
              />
              <span className="fas fa-lock"></span>
            </div>
            <div className="left-align">
              <span className="login--invalid">{passwordError}</span>
            </div>
            <LoginButton handleValidateUser={handleValidateUser} />
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginForm;
