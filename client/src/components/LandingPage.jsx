import React, { useState, useEffect } from "react";
import { Link , useLocation} from "react-router-dom";
import  "../styles/LandingPage.css";
import PupilRow from "./PupilRow";
import TableHeaderRow from "./TeacherHeaderRow";

function LandingPage() {
  const location = useLocation();
  const teacherID = location.state.teacherID;

  const [pupils, setPupils] = useState([]);
  const apiURL = "https://teacher-server-9cir.onrender.com";

  useEffect(() => {
    fetch(`${apiURL}/fetch-pupil-data`, {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ teacherID }),
  })
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
  }, [teacherID]);
  const deletePupil = (pupilId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pupil?"
    );
    if (confirmDelete) {
      fetch(`${apiURL}/pupil/${pupilId}`, {
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
      <h1>Pupil Records</h1>
      <Link to="/form">New Support Allocation Form</Link>
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


