import { useNavigate } from "react-router-dom";

function BackToLandingPageButton({ teacherID, teacherUsername ,setSaveMessage }) {
  const navigate = useNavigate();

  function handleClick() {
    console.log("backtolanding username", teacherUsername);
    navigate("/landingPage", { state: { teacherID, teacherUsername } });
    setSaveMessage('');
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
