import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import  "../styles/LandingPage.css";
import PupilRow from "./PupilRow";
import TableHeaderRow from "./TeacherHeaderRow";

function LandingPage() {
  const [pupils, setPupils] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/PupilWithTotalScoreAndSupportAllocation")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPupils(data); 
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const deletePupil = (pupilId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pupil?"
    );
    if (confirmDelete) {
      fetch(`http://localhost:5000/pupil/${pupilId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setPupils((prevPupils) =>
            prevPupils.filter((pupil) => pupil.pupil_id !== pupilId)
          );
        })
        .catch((error) => {
          console.error("Error deleting pupil:", error);
        });
    }
  };

  return (
    <div>
      <h1>Welcome to Landing page</h1>
      <Link to="/form">Add New Pupil</Link>
      {pupils.length === 0 ? (
        <p>No pupils data available.</p>
      ) : (
        <table className="pupil-table">
          <thead>
            <TableHeaderRow />
          </thead>
          <tbody>
            {pupils.map((pupil) => (
              <PupilRow
                key={pupil.pupil_id}
                pupil={pupil}
                onDelete={deletePupil}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LandingPage;


