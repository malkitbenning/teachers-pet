import React, { useState } from "react";
import PrintResult from "./PrintResult";
import "../styles/ShowResult.css";

function ShowResult({ selectedAnswers, questions, comments = [], teacherName, pupilName, date }) {
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [overrideScore, setOverrideScore] = useState("");
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
      )}
    </div>
  );
}

export default ShowResult;
