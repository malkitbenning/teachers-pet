import "../styles/TeacherOverride.css";
import { useEffect, useState } from "react";

function TeacherOverride({ totalScore, setTotalScore, overrideScore, setOverrideScore }) {
  const [supportAllocation, setSupportAllocation] = useState("");
  const [supportCategory, setSupportCategory] = useState("");

  useEffect(() => {
    let supportTotal = 0;
    let outputSupportCategory = "";
    let outputSupportAllocation = "";

    if (!overrideScore) {
      supportTotal = totalScore;
    } else {
      supportTotal = overrideScore;
    }

    if (supportTotal < 5) {
      outputSupportCategory = "NFA";
      outputSupportAllocation = "Off caseload";
    } else if (supportTotal >= 5 && supportTotal <= 14) {
      outputSupportCategory = "C3";
      outputSupportAllocation = "Annual check or visit";
    } else if (supportTotal >= 15 && supportTotal <= 19) {
      outputSupportCategory = "C2";
      outputSupportAllocation = "Twice yearly visit";
    } else if (supportTotal >= 20 && supportTotal <= 24) {
      outputSupportCategory = "C1";
      outputSupportAllocation = "Termly (3 term year)";
    } else if (supportTotal >= 25 && supportTotal <= 29) {
      outputSupportCategory = "B2";
      outputSupportAllocation = "Twice termly (3 term year)";
    } else if (supportTotal >= 30 && supportTotal <= 39) {
      outputSupportCategory = "B1";
      outputSupportAllocation = "Monthly";
    } else if (supportTotal >= 40 && supportTotal <= 49) {
      outputSupportCategory = "A3";
      outputSupportAllocation = "Fortnightly";
    } else if (supportTotal >= 50 && supportTotal <= 69) {
      outputSupportCategory = "A2";
      outputSupportAllocation = "Weekly";
    } else if (supportTotal >= 70) {
      outputSupportCategory = "A1";
      outputSupportAllocation = "2 or more visits per week";
    }
    setSupportCategory(outputSupportCategory);
    setSupportAllocation(outputSupportAllocation);
  }, [totalScore, overrideScore, supportCategory]);

  return (
    <>
      <table className="finalTable">
        <thead>
          <tr className="summary">
            <td colSpan="9">
              <span className="title ">Summary</span>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="8">CYP Total</td>
            <td><span className="title">{totalScore}</span></td>
          </tr>
          <tr>
            <td colSpan="9"><span className="title ">Teacher Override</span></td>
          </tr>
          <tr>
            <td colSpan="7" className="override-comment">
              <span className="comments title">Override Comment</span>
              <textarea></textarea>
            </td>
            <td colSpan="1" className=" overRide">
              Teacher Override
            </td>
            <td colSpan="1" className="inputCell">
              <input
                className="inputField"
                value={overrideScore}
                onChange={(e) => setOverrideScore(Number(e.target.value))}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="9"><span className="title ">Support Allocation</span></td>
          </tr>
          <tr>
            <td colSpan="6" className="override-comment">
              <span className="comments">Support Category</span>
            </td>
            <td colSpan="3">
              <span className="title">{supportCategory}</span>
            </td>
          </tr>
          <tr>
            <td colSpan="6">Support</td>
            <td colSpan="3">
            <span className="title">{supportAllocation}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
export default TeacherOverride;
