const client = require("./db-client");

const getPupilRecord = (req, res) => {
  const pupilID = req.body.pupilID;
  console.log(`here's the pupilID!! ${pupilID}`);
  client
    .query(
      "SELECT pupil_id, teacher_id, pupil_nickname, last_update, override_score, override_comment FROM pupil WHERE pupil_id =$1",
      [pupilID]
    )
    .then((result) => {
      console.log(result.rows);
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
module.exports = getPupilRecord;
