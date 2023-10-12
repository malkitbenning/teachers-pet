const client = require("./db-client");

const validateUser = (req, res) => {
  const { teacherUsername, teacherPassword } = req.body;

  client
    .query(
      "SELECT teacher_id FROM teacher WHERE teacher_username = $1 AND teacher_password = $2",
      [teacherUsername, teacherPassword]
    )
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(200).json({
          teacherID: result.rows[0].teacher_id,
        });
      } else {
        res.status(404).json({
          result: "failure",
          message: "Login failed, wrong username or password.",
        });
      }
    })
    .catch((error) => {
      res.status(502).json({
        result: "failure",
        message: "Failed to login",
      });
      client.end();
    });
};

module.exports = validateUser;
