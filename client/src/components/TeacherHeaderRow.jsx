import React from "react";
import "../styles/TableHeaderRow.css";

  function TableHeaderRow({ onSort, sortColumn, sortOrder }) {
    const isSortable = (column) => {
      return column === "pupil_name" || column === "last_update" || column === "support_code";
    };

    const getSortIndicator = (column) => {
      if (column === sortColumn) {
        return sortOrder === "asc" ? "▲" : "▼";
      }
      return "";
    };
    return (
      <tr>
        <th
          onClick={() => isSortable("pupil_name") && onSort("pupil_name")}
          className={`sortable-header ${isSortable("pupil_name") ? "sortable" : ""}`}
        >
          Pupil Name {isSortable("pupil_name") && getSortIndicator("pupil_name")}
        </th>
        
        <th
          onClick={() => isSortable("last_update") && onSort("last_update")}
          className={`sortable-header ${isSortable("last_update") ? "sortable" : ""}`}
        >
          Last Update {isSortable("last_update") && getSortIndicator("last_update")}
        </th>
        <th>Total Score</th>
        <th>Override Score</th>
        
        <th
          onClick={() => isSortable("support_code") && onSort("support_code")}
          className={`sortable-header ${isSortable("support_code") ? "sortable" : ""}`}
        >
          Support Code {isSortable("support_code") && getSortIndicator("support_code")}
        </th>
        <th>Support Allocation</th>
      </tr>
    );
  }

export default TableHeaderRow;