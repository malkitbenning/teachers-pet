import "../styles/login.css";
import React, { useState } from "react";
import LoginButton from "./LoginButton";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleValidateUser = (event) => {
    event.preventDefault();
    console.log(`validating ${username} ${password}`);
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
