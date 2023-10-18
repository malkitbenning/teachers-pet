import React from "react";
import "../styles/TableHeaderRow.css";

  function TableHeaderRow({ onSort, sortColumn, sortOrder }) {
    const getSortIndicator = (column) => {
      if (column === sortColumn) {
        return sortOrder === "asc" ? "↑" : "↓";
      }
      return "";
    };
    return (
      <tr>
        <th onClick={() => onSort("pupil_name")} className="sortable-header">
          Pupil Name {getSortIndicator("pupil_name")}
        </th>
        <th onClick={() => onSort("last_update")} className="sortable-header">
          Last Update {getSortIndicator("last_update")}
        </th>
        <th>Total Score</th>
        <th>Override Score</th>
        <th onClick={() => onSort("support_code")} className="sortable-header">
          Support Code {getSortIndicator("support_code")}
        </th>
        <th>Support Allocation</th>
      </tr>
    );
  }

export default TableHeaderRow;