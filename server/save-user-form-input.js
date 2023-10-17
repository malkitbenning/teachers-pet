const client = require("./db-client");
const deletePupil = require("./delete-pupil");

const saveUserFormInput = (req, res) => {
  const { formSubmission } = req.body;
  const { teacherID, pupilID, pupilName, updateDate, overrideScore, overrideComment, teacherSelectedAnswers } =
    formSubmission;

  // this function will add an individual answer to the table
  function addAnAnswer(pupilID, anAnswer) {
    client
      .query("INSERT INTO selected_option (pupil_id, answer_id, teacher_comment) VALUES ($1,$2,$3)", [
        pupilID,
        anAnswer.answerID,
        anAnswer.teacherComment,
      ])
      .then((result) => {
        if (result.rowCount > 0) {
        } else {
          res.status(404).json({
            result: "failure",
            message: "teacher answer could not be inserted",
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
        res.status(502).json({
          result: "failure",
          message: "Error saving teacher answers",
        });
        client.end();
      });
  }

  // delete existing pupil record before inserting new version
  if (pupilID) {
    client
      .query("DELETE FROM selected_option WHERE pupil_id = $1", [pupilID])
      .then((result) => {
        client
          .query("DELETE FROM pupil WHERE pupil_id = $1", [pupilID])
          .then((result) => {
            if (result.rowCount > 0) {
            } else {
              res.status(404).json({
                result: "failure",
                message: "Existing pupil record could not be found to be replaced",
              });
            }
          })
          .catch((error) => {
            console.log(error.message);
            res.status(502).json({
              result: "failure",
              message: "Error replacing pupil record",
            });
            client.end();
          });
      })
      .catch((error) => {
        console.log(error.message);
        res.status(502).json({
          result: "failure",
          message: "Error replacing pupil form record",
        });
        client.end();
      });
  }

  // insert new pupil
  client
    .query("SELECT MAX(pupil_id)+1 as next_id FROM pupil")
    .then((result) => {
      let nextPupilID = result.rows[0].next_id;
      // convert updateDate into a timestamp for storing on db
      const updateTimestamp = updateDate + " 00:00:00";

      client
        .query(
          "INSERT INTO pupil (pupil_id, teacher_id, pupil_nickname, last_update, override_score,override_comment) VALUES ($1,$2,$3,$4,$5,$6)",
          [nextPupilID, teacherID, pupilName, updateTimestamp, overrideScore, overrideComment]
        )
        .then((result) => {
          if (result.rowCount > 0) {
            for (let i = 0; i < teacherSelectedAnswers.length; i++) {
              const anAnswer = teacherSelectedAnswers[i];
              addAnAnswer(nextPupilID, anAnswer);
            }
            res.status(200).json({
              pupilID: nextPupilID,
            });
          } else {
            res.status(404).json({
              result: "failure",
              message: "Pupil record could not be inserted",
            });
          }
        })
        .catch((error) => {
          console.log(error.message);
          res.status(502).json({
            result: "failure",
            message: "Error saving form data",
          });
          client.end();
        });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(502).json({
        result: "failure",
        message: "Error setting next pupil id",
      });
      client.end();
    });
};

module.exports = saveUserFormInput;
