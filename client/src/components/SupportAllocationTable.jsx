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
        {supportAllocationTable.map((data, index) => (
          <tr key={index}>
            <td colSpan="2">{data.totalScoreRange}</td>
            <td colSpan="2">{data.supportCategory}</td>
            <td colSpan="2">{data.supportAllocation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SupportAllocationTable;
