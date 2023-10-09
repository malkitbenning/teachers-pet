import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import React, { useState, useEffect } from "react";


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
  // Function to delete a pupil record
  const deletePupil = (pupilId) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this pupil?");
    
    if (confirmDelete) {
    // Send a DELETE request to the server
    fetch(`http://localhost:5000/pupil/${pupilId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Remove the deleted pupil from the local state
        setPupils((prevPupils) =>
          prevPupils.filter((pupil) => pupil.pupil_id !== pupilId)
        );
      })
      .catch((error) => {
        console.error("Error deleting pupil:", error);
      });
  };
  }

  return (
    <div>
      <h1>Welcome to landing page</h1>
      <Link to="/form">Add New Pupil</Link>
      {pupils.length === 0 ? (
        <p>No pupils data available.</p>
      ) : (
        <table className="pupil-table">
          <thead>
            <tr>
              <th>Pupil ID</th>
              <th>Pupil Nickname</th>
              <th>Last Update</th>
              <th>Total Score</th>
              <th>Override Score</th>
              <th>Final Support Allocation</th>
              <th>Summary</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {pupils.map((pupil) => (
              <tr key={pupil.pupil_id}>
                <td>{pupil.pupil_id}</td>
                <td>{pupil.pupil_nickname}</td>
                <td>{pupil.last_update}</td>
                <td>{pupil.total_score}</td>
                <td>{pupil.override_score}</td>
                <td>{pupil.final_support_allocation}</td>
                <td>
                  <button>Summary</button>
                </td>
                <td>
                  <button>Edit</button>
                </td>
               <td>
                  <button onClick={() => deletePupil(pupil.pupil_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LandingPage;

