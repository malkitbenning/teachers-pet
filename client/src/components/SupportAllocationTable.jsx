import React from "react";

function SupportAllocationTable() {
  return (
    <table className="support-allocation-table finalTable">
      <thead className="sa-thead ">
        <tr>
          <th colSpan="2">Total Score Range</th>
          <th colSpan="2">Support Category</th>
          <th colSpan="2">Support Allocation</th>
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
