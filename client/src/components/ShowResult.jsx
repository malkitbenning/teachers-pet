import React, { useState, useEffect } from "react";
import PrintResult from "./PrintResult";
import SaveFormButton from "./SaveFormButton";
import "../styles/ShowResult.css";
import BackToLandingPageButton from "./BackToLandingPageButton";

function ShowResult({
  selectedAnswers,
  questions,
  comments = [],
  teacherID,
  teacherName,
  pupilID,
  pupilName,
  date,
}) {
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [overrideScore, setOverrideScore] = useState("");
  const [overrideComment, setOverrideComment] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleShowResults = () => {
    const unansweredQuestions = questions
      .map((_, index) => selectedAnswers[index])
      .some((answerId) => !answerId);

    if (unansweredQuestions || pupilName === "") {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
      setShowResults(true);
    }
  };

  useEffect(() => {
    let score = 0;
    for (let questionIndex in selectedAnswers) {
      const answerId = selectedAnswers[questionIndex];
      if (answerId) {
        const question = questions[questionIndex];
        const answer = question.answers.find(
          (ans) => ans.answer_id === answerId
        );
        if (answer && answer.answer_score) {
          score += answer.answer_score;
        }
      }
    }
    setTotalScore(score);
  }, [selectedAnswers, questions]);


  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div>
        <div className="resultsBtn">
          <button type="button" className="btn btn-primary showResultBtn" onClick={handleShowResults}>
            Show Result
          </button>
          {showErrorMessage && <div className="error-msg">Please answer all questions.......</div>}
        </div>

        {showResults && (
          <div id="print-content">
            <PrintResult
              selectedAnswers={selectedAnswers}
              questions={questions}
              comments={comments}
              teacherName={teacherName}
              pupilName={pupilName}
              date={date}
              totalScore={totalScore}
              setTotalScore={setTotalScore}
              overrideScore={overrideScore}
              setOverrideScore={setOverrideScore}
              overrideComment={overrideComment}
              setOverrideComment={setOverrideComment}
            />
            <div className="buttons-after-summary">
              <SaveFormButton
                selectedAnswers={selectedAnswers}
                comments={comments}
                teacherID={teacherID}
                pupilID={""}
                pupilName={pupilName}
                date={date}
                overrideScore={overrideScore}
                overrideComment={overrideComment}
              />
              <button className="printBtn" onClick={handlePrint}>
                Print
              </button>
              <BackToLandingPageButton teacherID={teacherID} teacherUsername={teacherName} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowResult;
