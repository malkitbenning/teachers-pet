function BackToLandingPageButton() {
  function handleClick() {
    console.log("back button clicked");
  }

  return (
    <div>
      <button onClick={handleClick}>Back to Caseload</button>
    </div>
  );
}

export default BackToLandingPageButton;
