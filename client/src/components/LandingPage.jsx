import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>Welcome to our Project </h1>
      <Link to="/form"><h2>Form</h2></Link>
    </div>
  );
}
   
export default LandingPage;
