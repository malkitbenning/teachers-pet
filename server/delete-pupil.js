const client = require("./db-client");

const deletePupil = (req, res) => {
  const pupilID = req.body.pupilID;
   client
    .query("DELETE FROM selected_option WHERE pupil_id = $1", [pupilID])
    .then((result) => {
      client
        .query("DELETE FROM pupil WHERE pupil_id = $1", [pupilID])
        .then((result) => {
          if (result.rowCount > 0) {
            res.status(200).json({
              pupilID: pupilID,
            });
          } else {
            res.status(404).json({
              result: "failure",
              message: "Pupil record could not be deleted",
            });
          }
        })
        .catch((error) => {
          console.log(error.message);
          res.status(502).json({
            result: "failure",
            message: "Error removing pupil record",
          });
          client.end();
        });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(502).json({
        result: "failure",
        message: "Error removing pupil form record",
      });
      client.end();
    });
};

module.exports = deletePupil;
