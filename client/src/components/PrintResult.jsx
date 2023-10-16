import React from "react";
import TeacherOverride from "./TeacherOverride";
import '../styles/print.css';

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
}) {
  return (
    <div id="tableAndContentToPrint">
      <h3 className="result-title">Vision Impairment Support Allocation </h3>
      <table id="tableToPrint" className="table result close-after-last-question">
        <div className="resultHeader">
        <p >Teacher Name: {teacherName}</p>
        <p >Pupil Name: {pupilName}</p>
        <p >Date: {date}</p>
        </div>

        <tbody >
          {Object.keys(selectedAnswers).map((questionIndex) => {
            const que = questions[questionIndex];
            const answer = que.answers.find((ans) => ans.answer_id === selectedAnswers[questionIndex]);
            const commentForAnswer = comments[questionIndex] || "";
            return (
              <React.Fragment key={questionIndex}>
                <div className="question-container">
                <tr className="question">
                  <td colSpan="12">
                    <h3>
                      Criterion{que.criterion_code}: {que.question_text}
                    </h3>
                  </td>
                  <td className="score" colSpan="1">
                    <h3 className="title">Score </h3>
                  </td>
                </tr>
                <tr>
                  <td colSpan="12" className="answer-text">
                    {answer.answer_text}
                  </td>
                  <td className="score-n" rowSpan="2">
                    <span className="title">{answer.answer_score}</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan="12">Teacher comments: {commentForAnswer}</td>
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
        />
      </table>
    </div>
  );
}

export default PrintResult;

