function deletePupil(req, res) {
  const pupilID = Number(req.body.pupilID);
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
          message: "Pupil could not be found to be deleted",
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(502).json({
        result: "failure",
        message: "Error deleting pupil",
      });
      client.end();
    });
}

module.exports = deletePupil;
