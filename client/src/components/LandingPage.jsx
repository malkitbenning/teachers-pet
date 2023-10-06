import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>Welcome, Diljit</h1>
      <Link to="/form">
        <h2>Form</h2>
      </Link>

      <table className="table">
        <tbody>
          <tr>
            <th>Pupil Name</th>
            <th>Last Updated</th>
            <th>Code</th>
            <th>Override Score</th>
            <th>Final Allocation</th>
            <th>Delete</th>
          </tr>
          <tr>
            <td>Jack</td>
            <td>06/10/2023</td>
            <td>A1</td>
            <td></td>
            <td>2 or more visits per week</td>
            <td>
              <button>x</button>
            </td>
          </tr>
          <tr>
            <td>Jill</td>
            <td>03/09/2023</td>
            <td>C3</td>
            <td></td>
            <td>Annual check or visit</td>
            <td>
              <button>x</button>
            </td>
          </tr>
          <tr>
            <td>Millhouse</td>
            <td>11/09/2023</td>
            <td>B2</td>
            <td>26</td>
            <td>Twice termly (3 term year)</td>
            <td>
              <button>x</button>
            </td>
          </tr>
          <tr>
            <td>Lisa</td>
            <td>08/08/2023</td>
            <td>NFA</td>
            <td></td>
            <td>Off caseload</td>
            <td>
              <button>x</button>
            </td>
          </tr>
          <tr>
            <td>Bart</td>
            <td>08/08/2023</td>
            <td>A2</td>
            <td>68</td>
            <td>Weekly</td>
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
