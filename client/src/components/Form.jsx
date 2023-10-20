import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ShowResult from "./ShowResult";
import appendices from "./data/appendices.json";
import Appendices from "./Appendices";

function Form() {
  const apiURL = process.env.REACT_APP_DEV_URL || "https://teacher-server-9cir.onrender.com";
  const endPoint = "/getQandA";
  const dataUrl = `${apiURL}${endPoint}`;
  const location = useLocation();
  const teacherUsername = location.state.teacherUsername;
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState(() => Array(questions.length).fill(""));
  const teacherID = location.state.teacherID;

  const [pupilName, setPupilName] = useState("");
  const [date, setDate] = useState("");
  const [overrideComment, setOverrideComment] = useState("");
  const [overrideScore, setOverrideScore] = useState("");
  const [savedPupilID, setSavedPupilID] = useState("");

  let editPupilID = location.state.pupilId;
  if (savedPupilID !== "" && editPupilID !== savedPupilID) {
    editPupilID = savedPupilID;
  }

  const pupilRecordEndPoint = "/get-pupil-record";
  const pupilAnswersEndPoint = "/get-pupil-answers";
  const pupilRecordURL = `${apiURL}${pupilRecordEndPoint}`;
  const pupilAnswersURL = `${apiURL}${pupilAnswersEndPoint}`;

  const [populator, setPopulator] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("There is no data to display");
        }
        return response.json();
      })
      .then((data) => setQuestions(data))
      .catch((err) => {
        console.error("Error fetching questions:", err.message);
      });

    if (editPupilID) {
      setPopulator(true);
    }
  }, [dataUrl, editPupilID, setPopulator]);

  const handleRadioChange = useCallback(
    (questionIndex, answer_id) => {
      const answer = questions[questionIndex].answers.find((ans) => ans.answer_id === answer_id);
      setSelectedAnswers((prevSelected) => ({
        ...prevSelected,
        [questionIndex]: answer_id,
      }));

      setScores((prevScores) => ({
        ...prevScores,
        [questionIndex]: answer ? answer.answer_score : 0,
      }));
    },
    [questions]
  );

  useEffect(() => {
    if (populator) {
      fetch(pupilRecordURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pupilID: editPupilID }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Unable to find existing Pupil Form");
          }
          return response.json();
        })
        .then((recordData) => {
          setPupilName(recordData[0].pupil_nickname);
          setOverrideComment(recordData[0].override_comment);
          setOverrideScore(recordData[0].override_score);
        })
        .catch((err) => {
          console.error("Error fetching existing Pupil Form:", err.message);
        });

      fetch(pupilAnswersURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pupilID: editPupilID }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Unable to find existing Pupil Form Answers");
          }
          return response.json();
        })
        .then((answerData) => {
          for (let i = 0; i < answerData.length; i++) {
            handleRadioChange(i, answerData[i].answer_id);
            const editComment = answerData.map((oneCase) => {
              return oneCase.teacher_comment;
            });
            setComments(editComment);
          }
        })
        .catch((err) => {
          console.error("Error fetching existing Pupil Form Answers:", err.message);
        });
    }
  }, [
    populator,
    editPupilID,
    pupilRecordURL,
    pupilAnswersURL,
    handleRadioChange,
    setOverrideComment,
    setOverrideScore,
  ]);

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
            <div className="textField">
              <label>Teacher Name</label>
              <input
                className="readOnlyInput"
                value={teacherUsername}
                tabIndex="-1"
                type="text"
                placeholder="enter teacher name"
                readOnly
              />
            </div>
            <div className="textField">
              <label>Pupil Name</label>
              <input
                onChange={(e) => setPupilName(e.target.value)}
                type="text"
                placeholder="enter pupil name"
                value={pupilName}
              />
            </div>
            <div className="textField">
              <label>Date</label>
              <input value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder="select date " />
            </div>
          </div>

          {questions.length === 0 ? (
            <tr>Loading...</tr>
          ) : (
            questions.map((que, index) => (
              <React.Fragment key={index}>
                {
                  <div>
                    {que.criterion_code === "1.1" || que.criterion_code === "1.2" || que.criterion_code === "7" ? (
                      <Appendices appendixData={appendices.appendices[index]} />
                    ) : null}
                    {que.criterion_code === "7" && <Appendices appendixData={appendices.appendices[2]} />}
                  </div>
                }
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
        teacherID={teacherID}
        teacherName={teacherUsername}
        pupilID={editPupilID}
        setSavedPupilID={setSavedPupilID}
        pupilName={pupilName}
        date={date}
        overrideComment={overrideComment}
        setOverrideComment={setOverrideComment}
        overrideScore={overrideScore}
        setOverrideScore={setOverrideScore}
      />
    </>
  );
}

export default Form;
