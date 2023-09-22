import React, { useState } from "react";
import "./Questions.css";

function Questions() {
  const [pupilName, setPupilName] = useState("");
  const [pupilScore, setPupilScore] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    const capturedDetails = { pupilName, pupilScore };
    // fetch("http://localhost:5000/pupilRecord/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(capturedDetails) })
    fetch("https://teacher-server-9cir.onrender.com/pupilRecord/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(capturedDetails) })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPupilName("");
        setPupilScore("");
      });
  }

  return (
    <div className="form-container">
      <form className="pupil-form" onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Pupil Name</label>
        </div>
        <div>
          <input type="text" required value={pupilName} onChange={(e) => setPupilName(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Pupil Score</label>
        </div>
        <div>
          <input type="text" required value={pupilScore} onChange={(e) => setPupilScore(e.target.value)} />
        </div>
        <div>
          <button>Add Record</button>
        </div>
      </form>
    </div>
  );
}

export default Questions;
