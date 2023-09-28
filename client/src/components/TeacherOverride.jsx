import "../styles/TeacherOverride.css";

function TeacherOverride({
  totalScore,
  setTotalScore,
  overrideScore,
  setOverrideScore,
}) {
  return (
    <>
      <tr>
        <td>CYP Total</td>
        <td>
          <span className="span-spacer">{totalScore}</span>
          {/* <input
            value={totalScore}
            onChange={(e) => setTotalScore(Number(e.target.value))}
          /> */}
        </td>
      </tr>
      <tr className="tr-spacer">
        <td colSpan="3">Teacher Override</td>
      </tr>
      <tr>
        <td colSpan="3" className="override-comment">
          <span className="comments">Override Comment</span>
          <textarea></textarea>
        </td>
        <td>Teacher Override</td>
        <td>
          <input
            value={overrideScore}
            onChange={(e) => setOverrideScore(Number(e.target.value))}
          />
        </td>
      </tr>
    </>
  );
}
export default TeacherOverride;
