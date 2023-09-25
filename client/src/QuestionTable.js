import React, { useState } from "react";
import data from "./questions.json"; // Import the JSON data
import "./QuestionTable.css"; // Import the CSS file

const QuestionTable = () => {
  const [scores, setScores] = useState({}); // Initialize scores state

  // Function to update the score based on the selected answer
  const handleAnswerChange = (criterion, answerScore) => {
    setScores((prevScores) => ({
      ...prevScores,
      [criterion]: answerScore,
    }));
  };

  return (
    <div>
      <h2 className="visual-header">Visual Impairment Form</h2>
      <table className="qa-table">
        <thead>
          <tr>
            <th className="header-criterion">Criterion</th>
            <th className="header-score">Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.Criterion}>
              <tr>
                <td colSpan="3" className="question-cell">
                  {item.Criterion}
                </td>
              </tr>
              {Object.keys(item)
                .filter(
                  (key) =>
                    key !== "Criterion" && key !== "Comment" && key !== "Score"
                )
                .map((key) => {
                  const option = item[key];
                  if (option.Score !== undefined) {
                    return (
                      <tr key={key}>
                        <td className="answer-cell">
                          <label>
                            <input
                              type="radio"
                              name={item.Criterion}
                              value={option.Score}
                              onChange={() =>
                                handleAnswerChange(item.Criterion, option.Score)
                              }
                            />
                            {option.Description}
                          </label>
                        </td>
                        <td className="score-cell">{option.Score}</td>
                      </tr>
                    );
                  } else {
                    return null; // Exclude options without a defined score
                  }
                })}
              <tr>
                <td colSpan="2" className="comment-cell">
                  Comment: <input type="text" />
                  &nbsp; CYP Score: {scores[item.Criterion] || 0}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;
