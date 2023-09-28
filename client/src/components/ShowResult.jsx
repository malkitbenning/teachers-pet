import React, { useState, useEffect } from "react";
import TeacherOverride from "./TeacherOverride";

function ShowResult({
  selectedAnswers,
  questions,
  comments = [],
  teacherName,
}) {
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [overrideScore, setOverrideScore] = useState("");
  const handleShowResults = () => {
    setShowResults(true);
  };

  // Use useEffect to calculate the total score when selectedAnswers changes
  useEffect(() => {
    let score = 0;
    for (let questionIndex in selectedAnswers) {
      const answer = questions[questionIndex].options.find(
        (ans) => ans.id === selectedAnswers[questionIndex]
      );
      if (answer && answer.score) {
        score += answer.score;
      }
    }
    setTotalScore(score);
  }, [selectedAnswers, questions]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleShowResults}
      >
        Show Result
      </button>
      {showResults && (
        <table className="table">
          <h2>Teacher Name: {teacherName}</h2>
          <tbody>
            {Object.keys(selectedAnswers).map((questionIndex) => {
              const que = questions[questionIndex];
              const answer = que.options.find(
                (ans) => ans.id === selectedAnswers[questionIndex]
              );
              const commentForAnswer = comments[questionIndex] || "";

              return (
                <React.Fragment key={questionIndex}>
                  <tr className="question">
                    <td colSpan="4">
                      <h3>{que.Criterion}</h3>
                    </td>
                    <td colSpan="2">
                      <h3>Score: {que.score}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="answer-text">
                      {answer.text}
                    </td>
                    <td colSpan="4" rowSpan="2">
                      {answer.score}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4">Teacher comments: {commentForAnswer}</td>
                  </tr>
                </React.Fragment>
              );
            })}
            {/*Display TeacherOverride Component at the end}*/}
            <TeacherOverride
              totalScore={totalScore}
              setTotalScore={setTotalScore}
              overrideScore={overrideScore}
              setOverrideScore={setOverrideScore}
            />
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShowResult;
