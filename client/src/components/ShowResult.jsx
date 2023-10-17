import React, { useState, useEffect } from "react";
import TeacherOverride from "./TeacherOverride";
import SaveFormButton from "./SaveFormButton";
import "../styles/ShowResult.css";

function ShowResult({ selectedAnswers, questions, comments = [], teacherID, teacherName, pupilID, pupilName, date }) {
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [overrideScore, setOverrideScore] = useState("");
  const [overrideComment, setOverrideComment] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleShowResults = () => {
    const unansweredQuestions = questions.map((_, index) => selectedAnswers[index]).some((answerId) => !answerId);

    if (unansweredQuestions || pupilName === "" || date === "") {
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
        const answer = question.answers.find((ans) => ans.answer_id === answerId);
        if (answer && answer.answer_score) {
          score += answer.answer_score;
        }
      }
    }
    setTotalScore(score);
  }, [selectedAnswers, questions]);

  return (
    <div>
      {showErrorMessage && <div className="error-msg">Please answer all questions.......</div>}
      <button type="button" className="btn btn-primary showResultBtn" onClick={handleShowResults}>
        Show Result
      </button>
      {showResults && (
        <div>
          <table className="table">
          <p className="resultHeader">Teacher Name: {teacherName}</p>
          <p className="resultHeader">Pupil Name: {pupilName}</p>
           <p className="resultHeader">Date: {date}</p>
          <tbody>
            {Object.keys(selectedAnswers).map((questionIndex) => {
              const question = questions[questionIndex];
              const answerId = selectedAnswers[questionIndex];
              const commentForAnswer = comments[questionIndex] || "";
              return (
                <React.Fragment key={questionIndex}>
                  <tr className={`question`}>
                    <td colSpan="9">
                      <h3>
                        Criterion {question.criterion_code}: {question.question_text}
                      </h3>
                    </td>
                    <td className="score" colSpan="1">
                      <h3 className="title">Score {question.answer_score}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9" className="answer-text">
                      {answerId ? question.answers.find((ans) => ans.answer_id === answerId).answer_text : "N/A"}
                    </td>
                    <td className="score" rowSpan="2">
                      <span className="title">
                        {answerId ? question.answers.find((ans) => ans.answer_id === answerId).answer_score : "N/A"}
                      </span>
                    </td>
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
              overrideComment={overrideComment}
              setOverrideComment={setOverrideComment}              
            />
          </tbody>
        </table>
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
        </div>
      )}
    </div>
  );
}

export default ShowResult;
