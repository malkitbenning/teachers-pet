import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/LandingPage.css";
import PupilRow from "./PupilRow";
import TableHeaderRow from "./TeacherHeaderRow";

function LandingPage() {
  const location = useLocation();
  const teacherID = location.state.teacherID;
  const teacherUsername = location.state.teacherUsername;
  const [pupils, setPupils] = useState([]);
  const apiURL = process.env.REACT_APP_DEV_URL || "https://teacher-server-9cir.onrender.com";
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch(`${apiURL}/fetch-pupil-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  }, [teacherID, apiURL]);

  const deletePupil = (pupilId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pupil Record?");
    if (confirmDelete) {
      fetch(`${apiURL}/delete-pupil`, {
        method: "DELETE",
        body: JSON.stringify({ pupilID: pupilId }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setPupils((prevPupils) => prevPupils.filter((pupil) => pupil.pupil_id !== pupilId));
        })
        .catch((error) => {
          console.error("Error deleting pupil:", error);
        });
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedPupils = [...pupils].sort((a, b) => {
    if (sortColumn === "pupil_name") {
      return sortOrder === "asc"
        ? a.pupil_nickname.localeCompare(b.pupil_nickname)
        : b.pupil_nickname.localeCompare(a.pupil_nickname);
    } else if (sortColumn === "last_update") {
      return sortOrder === "asc"
        ? a.last_update_date.localeCompare(b.last_update_date)
        : b.last_update_date.localeCompare(a.last_update_date);
    } else if (sortColumn === "support_code") {
      return sortOrder === "asc"
        ? a.final_support_category.localeCompare(b.final_support_category)
        : b.final_support_category.localeCompare(a.final_support_category);
    }
    return 0;
  });

  return (
    <div>
      <h1 className="caseloadHeader">{teacherUsername} Caseload</h1>
      <Link to="/form" state={{ teacherUsername, teacherID }}>
        <h2>New Support Allocation Form</h2>
      </Link>
      {pupils.length === 0 ? (
        <p>No pupil records to display .</p>
      ) : (
        <table className="pupil-table">
          <thead>
            <TableHeaderRow onSort={handleSort} sortColumn={sortColumn} sortOrder={sortOrder} />
          </thead>
          <tbody>
            {sortedPupils.map((pupil) => (
              <PupilRow
                key={pupil.pupil_id}
                pupil={pupil}
                onDelete={deletePupil}
                teacherUsername={teacherUsername}
                teacherID={teacherID}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LandingPage;

