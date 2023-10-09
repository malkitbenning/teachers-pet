import "../styles/login.css";
import React, { useState } from "react";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const apiURL = "http://localhost:5000/login";
  const handleValidateUser = (event) => {
    event.preventDefault();

    fetch(apiURL, {
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
          console.error("Login failed, please try again");
          // Next - Add code to stay on page and produce red text under input
        }
      })
      .then((data) => {
        if (data && data.teacherID) {
          console.log("Teacher ID:", data.teacherID);
          navigate("/landingPage");
          return data.teacherID;
        } else {
          console.error("ID could not be found.");
        }
      })
      .catch((error) => {
        // Create an error page when an error reached.
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="login-container">
        <div className="content">
          <div className="text">Login </div>
          <form className="loginForm" action="#" onSubmit={handleValidateUser}>
            <div className="field">
              <input
                type="text"
                required
                id="username"
                name="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                  console.log(event.target.value);
                }}
              />
              <span className="fas fa-user"></span>
              <label htmlFor="username">User Name </label>
            </div>
            <div className="field">
              <input
                type="password"
                required
                id="password"
                name="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  console.log(event.target.value);
                }}
              />
              <span className="fas fa-lock"></span>
              <label htmlFor="password">Password</label>
            </div>
            <div className="forgot-pass">
              {/*<a href="#">Forgot Password?</a> for future build*/}
            </div>
            <LoginButton handleValidateUser={handleValidateUser} />
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginForm;
