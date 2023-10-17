function BackToLandingPageButton() {
  function handleClick() {
    console.log("back button clicked");
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
