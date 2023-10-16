import React from "react";
import supportAllocationData from "./data/supportallocationtable.json";

function SupportAllocationTable() {
  const { supportAllocationTable } = supportAllocationData;

  return (
    <table className="finalTable">
      <thead>
        <tr>
          <th colSpan="2">Total Score Range</th>
          <th colSpan="2">Support Category</th>
          <th colSpan="2">Support Allocation</th>
        </tr>
      </thead>
      <tbody>
        {supportAllocationTable.map((allocation, index) => (
          <tr key={index}>
            <td colSpan="2">{allocation.totalScoreRange}</td>
            <td colSpan="2">row 1</td>
            <td colSpan="2">row 1</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SupportAllocationTable;
