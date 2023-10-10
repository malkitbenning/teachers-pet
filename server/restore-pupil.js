const client = require("./db-client");

const restorePupil = (req, res) => {
  const { pupilID, pupilNickname, teacherID, overrideScore, overrideComment } = req.body;
  client
    .query(
      "INSERT INTO pupil (pupil_id,pupil_nickname,teacher_id,last_update,override_score,override_comment) VALUES ($1,$2,$3, current_timestamp, $4,$5)",
      [pupilID, pupilNickname, teacherID, overrideScore, overrideComment]
    )
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(200).json({
          pupilID: pupilID,
        });
      } else {
        res.status(404).json({
          result: "failure",
          message: "Pupil could not be restored",
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(502).json({
        result: "failure",
        message: "Error inserting pupil",
      });

      client.end();
    });
};

module.exports = restorePupil;
