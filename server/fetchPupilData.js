const client = require("./db-client");

function fetchPupilData(req, res) {
  const reqTeacherID = req.body.teacherID;
  client
      .query(
        "select pv.pupil_id, pv.pupil_nickname, pv.last_update_date, pv.override_score, pv.calculated_score, case when pv.override_score is null then sam.support_category else pv.override_support_category end as final_support_category, case when pv.override_score is null then sam.support_allocation_text else pv.override_support_allocation_text end as final_support_allocation from pupil_view pv left join support_allocation_matrix sam on (pv.calculated_score >= sam.range_minimum and pv.calculated_score <= range_maximum) where pv.teacher_id = $1", [reqTeacherID]
      )
      .then((result) => {
        if (result.rowCount > 0) {
          res.status(200).json(result.rows);
        } else {
          res.status(404).json({
            result: "failure",
            message: "Pupil summary list could not be found",
          });
        }
      })
      .catch((error) => {
        console.error(error.message);
        res
          .status(502)
          .json({
            result: "failure",
            message: "Error fetching pupil data",
          })
          .finally(() => {
            client.end();
          });
      });
}

module.exports = fetchPupilData;
