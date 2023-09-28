import "../styles/TeacherOverride.css";

function TeacherOverride({ totalScore, setTotalScore }) {
  return (
    <>
      <tr>
        <td>CYP Total</td>
        <td>
          <input
            value={totalScore}
            onChange={(e) => setTotalScore(Number(e.target.value))}
          />
        </td>
      </tr>
      <tr>
        <td colSpan="3" className="override-comment">
          <span className="comments">Override Comment</span>
          <textarea></textarea>
        </td>
      </tr>
    </>
  );
}
export default TeacherOverride;
