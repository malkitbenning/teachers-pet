function TeacherOverride({ totalScore, setTotalScore }) {
  return (
    <tr>
      <td colSpan="3" className="comment-section">
        <span className="comments">Comments</span>
        <textarea></textarea>
      </td>
      <td>CYP Score</td>
      <td>
        <input value={totalScore} onChange={(e) => setTotalScore(Number(e.target.value))} />
      </td>
    </tr>
  );
}
export default TeacherOverride;
