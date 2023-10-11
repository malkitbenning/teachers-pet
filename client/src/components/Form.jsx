import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import questions from "./data/questions.json";
import ShowResult from "./ShowResult";
import Appendices from "./Appendices";

function Form(props) {
  const location = useLocation();
  const teacherTitle = location.state.teacherName;
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState(() => Array(questions.length).fill(""));
  const [teacherName, setTeacherName] = useState("");
  const [pupilName, setPupilName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
    setDate(formattedDate);
  }, []);

  const handleRadioChange = (questionIndex, answerId) => {
    const answer = questions[questionIndex].options.find((ans) => ans.id === answerId);
    setSelectedAnswers((prevSelected) => ({
      ...prevSelected,
      [questionIndex]: answerId,
    }));

    setScores((prevScores) => ({
      ...prevScores,
      [questionIndex]: answer ? answer.score : 0,
    }));
  };

  const handleComment = (index, e) => {
    const updatedComments = [...comments];
    updatedComments[index] = e.target.value;
    setComments(updatedComments);
  };

  return (
    <>
      <table className="table">
        <tbody>
          <div className="inputField">
            <tr className="textField">
              <td>
                <label>Teacher Name</label>
                <input onChange={(e) => setTeacherName(e.target.value)} type="text" defaultValue={teacherTitle} />
              </td>
            </tr>
            <tr className="textField">
              <td>
                <label>Pupil Name</label>
                <input onChange={(e) => setPupilName(e.target.value)} type="text" placeholder="enter pupil name" />
              </td>
            </tr>
            <tr className="textField">
              <td>
                <label>Date</label>
                <input value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder="select date " />
              </td>
            </tr>
          </div>
          {questions.map((que, index) => (
            <React.Fragment key={index}>
              <div>
                <Appendices questions={questions} questionIndex={index} />
              </div>

              <tr className="question">
                <td colSpan="4">
                  <h3>{que.Criterion}</h3>
                </td>
                <td colSpan="2">
                  <h3>Score {que.options.score}</h3>
                </td>
              </tr>
              {que.options.map((answer) => (
                <tr key={answer.id}>
                  <td className="answer-radio">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={"question_" + index}
                      value={answer.id}
                      checked={selectedAnswers[index] === answer.id}
                      onChange={() => handleRadioChange(index, answer.id)}
                    />
                  </td>
                  <td colSpan="3" className="answer-text">
                    {answer.text}
                  </td>
                  <td className="score" colSpan="2">
                    {answer.score}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" className="comment-section">
                  <span className="comments">comments</span>
                  <textarea
                    maxlength="255"
                    value={comments[index]}
                    onChange={(e) => handleComment(index, e)}
                    placeholder="Add a comment for this answer..."
                  />
                </td>
                <td style={{ width: "8%" }}>CYP Score</td>
                <td>{scores[index] || 0}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <ShowResult
        selectedAnswers={selectedAnswers}
        questions={questions}
        comments={comments}
        teacherName={teacherName}
        pupilName={pupilName}
        date={date}
      />
    </>
  );
}

export default Form;
