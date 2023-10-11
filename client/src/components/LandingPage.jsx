import { Link, useLocation } from "react-router-dom";
import "../styles/LandingPage.css";

function LandingPage(props) {
  const location = useLocation();
  const teacherName = location.state.teacherName;
  return (
    <div>
      <h1>Welcome, {teacherName}</h1>
      <Link to="/form" state={{ teacherName }}>
        <h2 className="new-form-title">New Form</h2>
      </Link>

      <table className="table">
        <tbody>
          <tr>
            <th>Pupil Name</th>
            <th>Last Updated</th>

            <th>Override Score</th>
            <th>Final Allocation</th>
            <th>Delete</th>
          </tr>
          <tr>
            <td>Jack</td>
            <td>06/10/2023</td>

            <td></td>
            <td>A1 - 2 or more visits per week</td>
            <td>
              <button>x</button>
            </td>
          </tr>
          <tr>
            <td>Jill</td>
            <td>03/09/2023</td>

            <td></td>
            <td>C3 - Annual check or visit</td>
            <td>
              <button>x</button>
            </td>
          </tr>
          <tr>
            <td>Millhouse</td>
            <td>11/09/2023</td>

            <td>26</td>
            <td>B2 - Twice termly (3 term year)</td>
            <td>
              <button>x</button>
            </td>
          </tr>
          <tr>
            <td>Lisa</td>
            <td>08/08/2023</td>

            <td></td>
            <td>NFA - Off caseload</td>
            <td>
              <button>x</button>
            </td>
          </tr>
          <tr>
            <td>Bart</td>
            <td>08/08/2023</td>

            <td>68</td>
            <td>A2 - Weekly</td>
            <td>
              <button>x</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LandingPage;
