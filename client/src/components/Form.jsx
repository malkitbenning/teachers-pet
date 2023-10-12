import React, { useState, useEffect } from "react";
import questions from "./data/questions.json";
import ShowResult from "./ShowResult";


function Form() {
  const dataUrl = "http://localhost:5000/getQandA";
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
                <input onChange={(e) => setTeacherName(e.target.value)} type="text" placeholder="enter your name " />
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

          {questions.length === 0 ? (
            <tr>Loading...</tr>
          ) : (
            questions.map((que, index) => (
              <React.Fragment key={index}>
                <tr className="question">
                  <td colSpan="4">
                    <h3>
                      Criterion{que.criterion_code}: {que.question_text}
                    </h3>
                  </td>
                  <td colSpan="2">
                    <h3>Score </h3>
                  </td>
                </tr>
                {que.answers &&
                  que.answers.map((answer) => (
                    <tr key={answer.answer_id}>
                      <td className="answer-radio">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={"question_" + index}
                          value={answer.answer_id}
                          checked={selectedAnswers[index] === answer.answer_id}
                          onChange={() => handleRadioChange(index, answer.answer_id)}
                        />
                      </td>
                      <td colSpan="3" className="answer-text">
                        {answer.answer_text}
                      </td>
                      <td className="score" colSpan="2">
                        {answer.answer_score}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan="4" className="comment-section">
                    <span className="comments">comments</span>
                    <textarea
                      maxLength="255"
                      value={comments[index]}
                      onChange={(e) => handleComment(index, e)}
                      placeholder="Add a comment for this answer..."
                    />
                  </td>
                  <td style={{ width: "8%" }}>CYP Score</td>
                  <td>{scores[index] || 0}</td>
                </tr>
              </React.Fragment>
            ))
          )}
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
