import React from "react";
import TeacherOverride from "./TeacherOverride";
import "../styles/print.css";

function PrintResult({
  selectedAnswers,
  questions,
  comments,
  teacherName,
  pupilName,
  date,
  totalScore,
  setTotalScore,
  overrideScore,
  setOverrideScore,
  overrideComment,
  setOverrideComment,
}) {
  const headerDate = new Date(date);
  const outDay = headerDate.getDate().toString().padStart(2, "0");
  const outMonth = (headerDate.getMonth() + 1).toString().padStart(2, "0");
  const outYear = headerDate.getFullYear();
  const printDate = `${outDay}-${outMonth}-${outYear}`;
  return (
    <div id="tableAndContentToPrint">
      <div id="pageBorder"></div>
      <h3 className="result-title">Vision Impairment Support Allocation </h3>
      <table id="tableToPrint" className="table result close-after-last-question">
        <div className="resultHeader">
          <p>Teacher Name: {teacherName}</p>
          <p>Pupil Name: {pupilName}</p>
          <p>Date: {printDate}</p>
        </div>
        <tbody>
          {Object.keys(selectedAnswers).map((questionIndex) => {
            const question = questions[questionIndex];
            const answerId = selectedAnswers[questionIndex];
            const commentForAnswer = comments[questionIndex] || "";
            return (
              <React.Fragment key={questionIndex}>
                <div className={`${questionIndex / 5 === 0 && "pageBreak"} question-container`}>
                  <tr className={`question`}>
                    <td colSpan="12">
                      <h3>
                        Criterion {question.criterion_code}: {question.question_text}
                      </h3>
                    </td>
                    <td className="score" colSpan="1">
                      <h3 className="title">Score {question.answer_score}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="12" className="answer-text">
                      {answerId ? question.answers.find((ans) => ans.answer_id === answerId).answer_text : "N/A"}
                    </td>
                    <td className="score-n" rowSpan="2">
                      <span className="title-score">
                        {answerId ? question.answers.find((ans) => ans.answer_id === answerId).answer_score : "N/A"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="12">Teacher comment: {commentForAnswer}</td>
                  </tr>
                </div>
              </React.Fragment>
            );
          })}
        </tbody>
        <TeacherOverride
          totalScore={totalScore}
          setTotalScore={setTotalScore}
          overrideScore={overrideScore}
          setOverrideScore={setOverrideScore}
          overrideComment={overrideComment}
          setOverrideComment={setOverrideComment}
        />
      </table>
    </div>
  );
}

export default PrintResult;
