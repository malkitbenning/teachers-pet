import { Link } from "react-router-dom";

function LoginButton({ handleValidateUser }) {
  return (
    <div>
      <button onClick={handleValidateUser}>Sign in</button>
    </div>
  );
}

export default LoginButton;
