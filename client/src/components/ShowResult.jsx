import React, { useState, useEffect } from "react";
import PrintResult from "./PrintResult";
import SaveFormButton from "./SaveFormButton";
import "../styles/ShowResult.css";

function ShowResult({ selectedAnswers, questions, comments = [], teacherName, pupilName, date }) {
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [overrideScore, setOverrideScore] = useState("");

  useEffect(() => {
    let score = 0;
    for (let questionIndex in selectedAnswers) {
      const answer = questions[questionIndex].answers.find((ans) => ans.answer_id === selectedAnswers[questionIndex]);
      if (answer && answer.answer_score) {
        score += answer.answer_score;
      }
    }
    setTotalScore(score);
  }, [selectedAnswers, questions]);

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="resultsBtn">
        <button type="button" className="btn btn-primary showResultBtn" onClick={handleShowResults}>
          Show Result
        </button>
        <button className="printBtn" onClick={handlePrint}>
          Print
        </button>
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
          />
        </div>
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
      )}
      
    </div>
  );
}

export default ShowResult;
