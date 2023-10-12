const { client } = require("./db-client");

async function fetchPupilData(req, res) {
  try {
    const query = `
      SELECT
        p.pupil_id,
        p.pupil_nickname,
        p.last_update,
        p.override_score,
        COALESCE(SUM(a.answer_score), 0) AS total_score,
        CONCAT(
          matrix.support_category,
          ' | ',
          matrix.support_allocation_text
        ) AS final_support_allocation
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
      LEFT JOIN
        support_allocation_matrix AS matrix
      ON
        p.override_score >= matrix.range_minimum
        AND p.override_score <= matrix.range_maximum
      GROUP BY
        p.pupil_id, p.pupil_nickname, p.last_update, p.override_score, matrix.support_category, matrix.support_allocation_text;
    `;
    const result = await client.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching pupil data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = fetchPupilData;
