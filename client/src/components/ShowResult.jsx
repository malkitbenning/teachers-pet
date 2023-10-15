// import React, { useState, useEffect } from "react";
// import TeacherOverride from "./TeacherOverride";

// function ShowResult({ selectedAnswers, questions, comments = [], teacherName, pupilName, date }) {
//   const [showResults, setShowResults] = useState(false);
//   const [totalScore, setTotalScore] = useState(0);
//   const [overrideScore, setOverrideScore] = useState("");
//   const handleShowResults = () => {
//     setShowResults(true);
//   };

//   // Use useEffect to calculate the total score when selectedAnswers changes
//   useEffect(() => {
//     let score = 0;
//     for (let questionIndex in selectedAnswers) {
//       const answer = questions[questionIndex].answers.find((ans) => ans.answer_id === selectedAnswers[questionIndex]);
//       if (answer && answer.answer_score) {
//         score += answer.answer_score;
//       }
//     }
//     setTotalScore(score);
//   }, [selectedAnswers, questions]);

//   return (
//     <div>
//       <button type="button" className="btn btn-primary showResultBtn" onClick={handleShowResults}>
//         Show Result
//       </button>
//       {showResults && (
//         <table className="table">
//           <p className="resultHeader">Teacher Name: {teacherName}</p>
//           <p className="resultHeader">Pupil Name: {pupilName}</p>
//           <p className="resultHeader">Date: {date}</p>
//           <tbody>
//             {Object.keys(selectedAnswers).map((questionIndex) => {

//               const que = questions[questionIndex];
//               const answer = que.answers.find((ans) => ans.answer_id === selectedAnswers[questionIndex]);
//               const commentForAnswer = comments[questionIndex] || "";
//               return (
//                 <React.Fragment key={questionIndex}>
//                   <tr className="question">
//                     <td colSpan="9">
//                       <h3>
//                         Criterion{que.criterion_code}: {que.question_text}
//                       </h3>
//                     </td>
//                     <td className="score" colSpan="1">
//                       <h3 className="title">Score {que.answer_score}</h3>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td colSpan="9" className="answer-text">
//                       {answer.answer_text}
//                     </td>
//                     <td className="score" rowSpan="2">
//                       <span className="title">{answer.answer_score}</span>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td colSpan="9">Teacher comments: {commentForAnswer}</td>
//                   </tr>
//                 </React.Fragment>
//               );
//             })}
//             <TeacherOverride
//               totalScore={totalScore}
//               setTotalScore={setTotalScore}
//               overrideScore={overrideScore}
//               setOverrideScore={setOverrideScore}
//             />
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default ShowResult;


// import React, { useState, useEffect } from "react";
// import TeacherOverride from "./TeacherOverride";

// function ShowResult({ selectedAnswers, questions, comments = [], teacherName, pupilName, date }) {
//   const [showResults, setShowResults] = useState(false);
//   const [totalScore, setTotalScore] = useState(0);
//   const [overrideScore, setOverrideScore] = useState("");

//   const handleShowResults = () => {
//     const unansweredQuestions = questions
//       .map((_, index) => selectedAnswers[index])
//       .some((answerId) => !answerId);

//     if (unansweredQuestions) {
//       alert("Please answer all questions before showing the results.");
//     } else {
//       setShowResults(true);
//     }
//   };

//   // Use useEffect to calculate the total score when selectedAnswers changes
//   useEffect(() => {
//     let score = 0;
//     for (let questionIndex in selectedAnswers) {
//       const answer = questions[questionIndex].answers.find((ans) => ans.answer_id === selectedAnswers[questionIndex]);
//       if (answer && answer.answer_score) {
//         score += answer.answer_score;
//       }
//     }
//     setTotalScore(score);
//   }, [selectedAnswers, questions]);

//   return (
//     <div>
//       <button type="button" className="btn btn-primary showResultBtn" onClick={handleShowResults}>
//         Show Result
//       </button>
//       {showResults && (
//         <table className="table">
//           <p className="resultHeader">Teacher Name: {teacherName}</p>
//           <p className="resultHeader">Pupil Name: {pupilName}</p>
//           <p className="resultHeader">Date: {date}</p>
//           <tbody>
//             {Object.keys(selectedAnswers).map((questionIndex) => {
//               const que = questions[questionIndex];
//               const answerId = selectedAnswers[questionIndex];
//               const commentForAnswer = comments[questionIndex] || "";
//               return (
//                 <React.Fragment key={questionIndex}>
//                   <tr className={`question`}>
//                     <td colSpan="9">
//                       <h3>
//                         Criterion{que.criterion_code}: {que.question_text}
//                       </h3>
//                     </td>
//                     <td className="score" colSpan="1">
//                       <h3 className="title">Score {que.answer_score}</h3>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td colSpan="9" className="answer-text">
//                       {answerId ? questions[questionIndex].answers.find((ans) => ans.answer_id === answerId).answer_text : "N/A"}
//                     </td>
//                     <td className="score" rowSpan="2">
//                       <span className="title">{answerId ? que.answer_score : "N/A"}</span>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td colSpan="9">Teacher comments: {commentForAnswer}</td>
//                   </tr>
//                 </React.Fragment>
//               );
//             })}
//             <TeacherOverride
//               totalScore={totalScore}
//               setTotalScore={setTotalScore}
//               overrideScore={overrideScore}
//               setOverrideScore={setOverrideScore}
//             />
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default ShowResult;

import React, { useState, useEffect } from "react";
import TeacherOverride from "./TeacherOverride";
import "../styles/ShowResult.css";

function ShowResult({ selectedAnswers, questions, comments = [], teacherName, pupilName, date }) {
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [overrideScore, setOverrideScore] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleShowResults = () => {
    const unansweredQuestions = questions
      .map((_, index) => selectedAnswers[index])
      .some((answerId) => !answerId);

    if (unansweredQuestions) {
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
       {showErrorMessage && (
        <div className="error-msg">
          Please answer all questions.......
        </div>
      )}
      <button type="button" className="btn btn-primary showResultBtn" onClick={handleShowResults}>
        Show Result
      </button>
      
      {showResults && (
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
                      <h3 className="title">Score {answerId ? question.answers.find((ans) => ans.answer_id === answerId).answer_score : "N/A"}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9" className="answer-text">
                      {answerId ? question.answers.find((ans) => ans.answer_id === answerId).answer_text : "N/A"}
                    </td>
                    <td className="score" rowSpan="2">
                      <span className="title">{answerId ? question.answers.find((ans) => ans.answer_id === answerId).answer_score : "N/A"}</span>
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
      )}
    </div>
  );
}

export default ShowResult;

