const client = require("./db-client");

const validateUser = (req, res) => {
  const { teacherUsername, teacherPassword } = req.body;

  client.query("SELECT * FROM teacher").then((result) => {
    console.log(result.rows);
    const teacherID = result.rows.teacher_id;
    res.status(200).json(result.rows);

    // if (teacherPassword && teacherUsername) {
    //   console.log(result.rows);
    //   res.status(200).json(result.rows);
    // }

    // if (result) {
    //   res
    //     .status(200)
    //     .json({ message: "Login successful.", teacherID: result });
    // } else {
    //   res.status(401).json({ error: "Login failed, please try again." });
    // }
  });
};

module.exports = validateUser;
