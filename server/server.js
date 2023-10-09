const express = require("express");
require("dotenv").config();
const { Client } = require("pg");
const app = express();

let cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const expressPort = process.env.PORT || 5000;


const client = new Client({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBDATABASE,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
  ssl: true,
});
client.connect();

const validateUser = (req, res) => {
  const { teacherUsername, teacherPassword } = req.body;

  // check if matches specific string
  if (teacherUsername === "benning123" && teacherPassword === "abc123") {
    res.status(200).json({ message: "login details correct", teacherID: "3" });
  } else {
    res.status(401).json({ error: "incorrect login details" });
  }
};

// endpoint to validate user credentials
app.get("/login", validateUser);

app.get("/PupilWithTotalScoreAndSupportAllocation", async (req, res) => {
  try {
    // Query 1: Fetch pupil data
    const pupilDataQueryResult = await client.query(`
      SELECT
        p.pupil_id,
        p.pupil_nickname,
        p.last_update,
        p.override_score,
        p.override_comment
      FROM
        pupil p
    `);

    // Query 2: Calculate total score
    const totalScoreQueryResult = await client.query(`
      SELECT
        p.pupil_id,
        p.pupil_nickname,
        p.last_update,
        p.override_score,
        COALESCE(SUM(a.answer_score), 0) AS total_score
      FROM
        pupil p
      LEFT JOIN
        selected_option AS so
      ON
        p.pupil_id = so.pupil_id
      LEFT JOIN
        answer AS a
      ON
        so.answer_id = a.answer_id
      GROUP BY
        p.pupil_id, p.pupil_nickname, p.last_update, p.override_score;
    `);

    // Query 3: Calculate final support allocation
    const finalSupportAllocationQueryResult = await client.query(`
      WITH total_scores AS (
        SELECT
          p.pupil_id,
          p.pupil_nickname,
          p.last_update,
          p.override_score,
          COALESCE(SUM(a.answer_score), 0) AS total_score
        FROM
          pupil p
        LEFT JOIN
          selected_option AS so
        ON
          p.pupil_id = so.pupil_id
        LEFT JOIN
          answer AS a
        ON
          so.answer_id = a.answer_id
        GROUP BY
          p.pupil_id, p.pupil_nickname, p.last_update, p.override_score
      ),
      support_allocation_override AS (
        SELECT
          ts.pupil_id,
          ts.pupil_nickname,
          ts.last_update,
          ts.override_score,
          CONCAT(
            matrix.support_category,
            ' | ',
            matrix.support_allocation_text
          ) AS final_support_allocation
        FROM
          total_scores AS ts
        INNER JOIN
          support_allocation_matrix AS matrix
        ON
          ts.override_score >= matrix.range_minimum
          AND ts.override_score <= matrix.range_maximum
      )
      SELECT * FROM support_allocation_override;
    `);

    // Combine the results from the queries into a single array of objects
    const combinedData = pupilDataQueryResult.rows.map((pupilData) => {
      const totalScoreData = totalScoreQueryResult.rows.find(
        (scoreData) => scoreData.pupil_id === pupilData.pupil_id
      );
      const finalSupportAllocationData =
        finalSupportAllocationQueryResult.rows.find(
          (allocationData) => allocationData.pupil_id === pupilData.pupil_id
        );

      //  finalSupportAllocationData code
      const finalSupportAllocation =
        finalSupportAllocationData?.final_support_allocation || "";

      return {
        ...pupilData,
        total_score: totalScoreData.total_score || 0,
        final_support_allocation: finalSupportAllocation,
      };
    });

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching pupil data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
 
app.listen(expressPort, () =>
  console.log(`Listening on expressPort ${expressPort}`)
);
