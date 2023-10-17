function BackToLandingPageButton({ teacherID }) {
  function handleClick() {
    console.log(teacherID);
  }

  return (
    <div>
      <button className="btn-primary" onClick={handleClick}>
        Back to Caseload
      </button>
    </div>
  );
}

export default BackToLandingPageButton;
