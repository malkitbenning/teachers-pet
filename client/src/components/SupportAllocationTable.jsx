import React from "react";
import "../styles/SupportAllocationTable.css";

function SupportAllocationTable() {
  return (
    <table className="support-allocation-table finalTable">
      <thead className="sa-thead ">
        <tr>
          <th colSpan="2">heading 1</th>
          <th colSpan="2">heading 2</th>
          <th colSpan="2">heading 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="2">row 1</td>
          <td colSpan="2">row 1</td>
          <td colSpan="2">row 1</td>
        </tr>
      </tbody>
    </table>
  );
}

export default SupportAllocationTable;
