import { Link } from "react-router-dom";

function LoginButton() {
  return (
    <div>
      <Link to="/LandingPage">
        <button>Sign in</button>
      </Link>
    </div>
  );
}

export default LoginButton;
