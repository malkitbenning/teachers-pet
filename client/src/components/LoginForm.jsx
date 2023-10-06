import  "../styles/login.css";
import LoginButton from "./LoginButton";

function LoginForm() {
  return (
 <>
  <div className="login-container">
    <div className="content">
      <div className="text">Login </div>
      <form className="loginForm" action="#">
        <div className="field">
          <input type="text" required />
          <span className="fas fa-user"></span>
          <label>User Name </label>
        </div>
        <div className="field">
          <input type="password" required />
          <span className="fas fa-lock"></span>
          <label>Password</label>
        </div>
        <div className="forgot-pass">
        {/*<a href="#">Forgot Password?</a> for future build*/ }
        </div>
        <LoginButton/>
      </form>
    </div>
    </div>
  </>
  );
}
export default LoginForm;


