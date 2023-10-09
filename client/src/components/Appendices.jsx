import React from "react";
import "../styles/appendixes.css";

function Appendixes({ questionIndex, questions }) {
  const que = questions[questionIndex];

  if (!que || !que.appendix) {
    return null; // Or return some fallback UI if you prefer
  }

  return (
    <div>
      <table className="table appendixTable">
        <tbody>
          <tr className="appendixTitle">
            <th colSpan="4">
              <span>{que.appendix.type}</span>
            </th>
          </tr>
          {que.appendix.details.map((detail, detailIndex) => (
            <React.Fragment key={detailIndex}>
              <tr>
                <h4>{detail.subsection}</h4>
              </tr>
              <tr>
                <h4>{detail.title}</h4>
              </tr>

              <tr>
                {detail.description && <td colSpan="2">{detail.description}</td>}
                {detail.measurement && <td colSpan="2">{detail.measurement}</td>}
              </tr>

              {Array.isArray(detail.considerations) &&
                detail.considerations.map((con, conIndex) => (
                  <tr key={conIndex}>
                    <td colSpan="4" className="note">
                      <li>{con}</li>
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appendixes;
