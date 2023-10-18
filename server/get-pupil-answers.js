const client = require("./db-client");

const getPupilAnswers = (req, res) => {
  const pupilID = req.body.pupilID;

  client
    .query("SELECT answer_id, teacher_comment FROM selected_option WHERE pupil_id =$1", [pupilID])
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch(() => {
      res.status(404).json({
        result: "failure",
        message: "No answers found to display",
      });
      client.end();
    });
};
module.exports = getPupilAnswers;
