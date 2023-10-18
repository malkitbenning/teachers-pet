
import React from "react";
import { useNavigate } from "react-router-dom";

function PupilRow({ pupil, onDelete, teacherUsername, teacherID }) {
  const navigate = useNavigate();

  const onEdit = (pupilId) => {
    navigate(`/form`, { state: { teacherUsername, teacherID, pupilId } });
  };
  const shortDate = pupil.last_update_date.substring(0, 10);
  return (
    <tr key={pupil.pupil_id}>
      <td>{pupil.pupil_nickname}</td>
      <td>{shortDate}</td>
      <td>{pupil.calculated_score}</td>
      <td>{pupil.override_score}</td>
      <td>{pupil.final_support_category}</td>
      <td>{pupil.final_support_allocation}</td>
      <td>
        <button>Print</button>
      </td>
      <td>
        <button onClick={() => onEdit(pupil.pupil_id)}>Edit</button>
      </td>
      <td>
        <button onClick={() => onDelete(pupil.pupil_id)}>Delete</button>
      </td>
    </tr>
  );
}

export default PupilRow;

