import React, { useState, useEffect } from "react";
import TeacherOverride from "./TeacherOverride";

function ShowResult({ selectedAnswers, questions, comments = [],teacherName, pupilName,date }) {
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
        className="btn btn-primary showResultBtn"
        onClick={handleShowResults}
      >
        Show Result
      </button>
      {showResults && (
        <table className="table">
            <p className="resultHeader">Teacher Name: {teacherName}</p>
            <p className="resultHeader">Pupil Name: {pupilName}</p>
            <tbody>
              {Object.keys(selectedAnswers).map((questionIndex) => {
                const que = questions[questionIndex];
                const answer = que.options.find(
                  (ans) => ans.id === selectedAnswers[questionIndex]
                );
                const commentForAnswer = comments[questionIndex] || "";

<<<<<<< Updated upstream
                return (
                  <React.Fragment key={questionIndex}>
                    <tr className="question">
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
=======
              const answer = que.answers.find((ans) => ans.answer_id === selectedAnswers[questionIndex]);
              if (answer) {
                console.log(answer.answer_text);
              } else {
              }
              const commentForAnswer = comments[questionIndex] || "";

              return (
                <React.Fragment key={questionIndex}>
                  <tr className="question">
                    <td colSpan="9">
                      <h3>
                        Criterion{que.criterion_code}: {que.question_text}
                      </h3>
                    </td>
                    <td className="score" colSpan="1">
                      <h3 className="title">Score {que.answer_score}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9" className="answer-text">
                      {answer.answer_text}
                    </td>
                    <td className="score" rowSpan="2">
                      <span className="title">{answer.answer_score}</span>
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
            />
          </tbody>
        </table>
>>>>>>> Stashed changes
      )}
    </div>
  );
}

export default ShowResult;
