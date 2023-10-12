const client = require("./db-client");

const getQandA = (req, res) => {
  client
    .query(
      "SELECT q.criterion_code, q.question_text,json_agg(a.*) AS answers FROM question q JOIN answer a ON q.question_id = a.question_id GROUP BY q.question_id ORDER BY q.question_id ASC;"
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch(() => {
      res.status(404).json({
        result: "failure",
        message: "No data found to display",
      });
      client.end();
    });
};

module.exports = getQandA;
