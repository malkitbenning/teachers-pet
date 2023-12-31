import "../styles/TeacherOverride.css";
import { useEffect, useState } from "react";
import "../styles/print.css";
import SupportAllocationTable from "./SupportAllocationTable";

function TeacherOverride({
  totalScore,
  setTotalScore,
  overrideScore,
  setOverrideScore,
  overrideComment,
  setOverrideComment,
}) {
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
              <h3 className="title ">Summary</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="6">
              <h3>CYP calculated score</h3>
            </td>
            <td colSpan="4">
              <span className="title">{totalScore}</span>
            </td>
          </tr>
          <tr>
            <td colSpan="9">
              <h2 className="title ">Teacher Adjustment</h2>
              <div>
                <SupportAllocationTable />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="6" className="override-comment">
              <h4 className="comment title">Teacher Adjustment Comment</h4>
              <span className="title">
                Evidence underpinning any professional adjustment made to the CYP’s matrix support allocation
              </span>

              <textarea
                className="overrideCommentArea"
                maxLength="255"
                value={overrideComment}
                onChange={(e) => setOverrideComment(e.target.value)}
              ></textarea>
            </td>
            <td colSpan="2" className="overRide">
              <h4>Teacher adjusted CYP total</h4>
            </td>
            <td colSpan="1" className="inputCell">
              <input
                className="inputOverrideScore"
                value={overrideScore}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue <= 100 || inputValue === "") {
                    setOverrideScore(inputValue);
                  }
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="9">
              <h2 className="title ">Support Allocation</h2>
            </td>
          </tr>
          <tr>
            <td colSpan="6" className="support-category">
              <span className="comments"> Support Category</span>
            </td>
            <td colSpan="3">
              <span className="title">{supportCategory}</span>
            </td>
          </tr>
          <tr>
            <td colSpan="6">
              <h3>Support</h3>
            </td>
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
