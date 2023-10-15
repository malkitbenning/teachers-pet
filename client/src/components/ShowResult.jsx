import React, { useState, useEffect } from "react";
import TeacherOverride from "./TeacherOverride";
import "../styles/ShowResult.css";

function ShowResult({ selectedAnswers, questions, comments = [],teacherName, pupilName,date }) {
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [overrideScore, setOverrideScore] = useState("");
  const [incompleteQuestionIndex, setIncompleteQuestionIndex] = useState(-1);

  const handleShowResults = () => {
    const incompleteIndex = questions.findIndex((_, i) => {
      const answerId = selectedAnswers[i];
      return !answerId;
    });
    if (incompleteIndex === -1) {
      setShowResults(true);
      setIncompleteQuestionIndex(-1);
    } else {
      setIncompleteQuestionIndex(incompleteIndex);
    }
  };
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
    {incompleteQuestionIndex !== -1 && (
        <div className="error-msg">
          Please answer all questions.......
        </div>
      )}
      {!showResults && ( 
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleShowResults}
        >
          Show Result
        </button>
      )}
      {showResults && (
        <table className="table">
            <p className="resultHeader">Teacher Name: {teacherName}</p>
            <p className="resultHeader">Pupil Name: {pupilName}</p>
            <tbody>
              {questions.map((que, index) => {
                const answer = que.options.find(
                (ans) => ans.id === selectedAnswers[index]
              );
              const commentForAnswer = comments[index] || "";
                return (
                  <React.Fragment key={index}>
                    <tr
                    className={`question ${
                      incompleteQuestionIndex === index ? "incomplete" : ""
                    }`}
                  >
                      <td colSpan="9"><h3>{que.Criterion}</h3></td>
                      <td className="score" colSpan="1"><h3 className="title" >Score {que.score}</h3></td>
                    </tr>
                    <tr>
                      <td colSpan="9" className="answer-text">{answer.text}</td>
                      <td  className="score"  rowSpan="2" ><span className="title">{answer.score}</span></td>
                    </tr>
                    <tr>
                      <td colSpan="9">Teacher comments: {commentForAnswer}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
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
