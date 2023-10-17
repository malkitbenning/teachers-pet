import { useNavigate } from "react-router-dom";

function BackToLandingPageButton({ teacherID }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/landingPage", { state: { teacherID } });
  }

  return (
    <div>
      <button className="backBtn" onClick={handleClick}>
        Back to Caseload
      </button>
    </div>
  );
}

export default BackToLandingPageButton;
