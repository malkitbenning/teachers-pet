import React, { useState } from "react";
import "./ServerTest.css";

function ServerTest() {
  const [pupilName, setPupilName] = useState("");
  const [pupilScore, setPupilScore] = useState("");

  function handleGet(event) {
    event.preventDefault();
    const fetchAddress = "https://teacher-server-9cir.onrender.com/";
    // const fetchAddress = "http://localhost:5000/";
    fetch(fetchAddress)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPupilName(data.pupilName);
        setPupilScore(data.pupilScore);
      });
  }

  return (
    <div>
      <div>
        <p>Pupil Name {pupilName}</p>
        <p>Pupil Score {pupilScore}</p>
      </div>
      <div>
        <button onClick={handleGet}>Test Fetch from Server</button>
      </div>
    </div>
  );
}

export default ServerTest;
