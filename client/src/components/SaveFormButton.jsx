function SaveFormButton({
  selectedAnswers,
  comments,
  teacherID,
  pupilID,
  setSavedPupilID,
  pupilName,
  date,
  overrideScore,
  overrideComment,
  saveMessage,
  setSaveMessage,
}) {
  const apiURL = process.env.REACT_APP_DEV_URL || "https://teacher-server-9cir.onrender.com";
  const endPoint = "/save-user-form-input";
  const formSubmission = {};

  function saveUserInput() {
    const dateTime = new Date();
    const formattedDateTime = dateTime.toLocaleString();

    setSaveMessage(`Case successfully saved on ${formattedDateTime}`);

    formSubmission.pupilID = pupilID;
    formSubmission.teacherID = teacherID;
    formSubmission.pupilName = pupilName;
    formSubmission.updateDate = date;
    formSubmission.overrideScore = overrideScore;
    formSubmission.overrideComment = overrideComment;
    const teacherAnswerIDs = Object.values(selectedAnswers);
    formSubmission.teacherSelectedAnswers = teacherAnswerIDs.map((answer, index) => {
      return {
        answerID: answer,
        teacherComment: comments[index],
      };
    });

    fetch(`${apiURL}${endPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formSubmission }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSavedPupilID(data.pupilID);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <div>
      <button className="saveBtn" onClick={saveUserInput}>
        Save
      </button>
    </div>
  );
}

export default SaveFormButton;
