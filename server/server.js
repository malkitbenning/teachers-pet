const express = require("express");
require("dotenv").config();
const app = express();

let cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const expressPort = process.env.PORT || 5000;

app.listen(expressPort, () => console.log(`Listening on expressPort ${expressPort}`));

const { Client } = require("pg");
const client = new Client({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  port: process.env.DBPORT,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  ssl: true,
});

client.connect(function (err) {
  if (err) throw err;
});

const deletePupil = (req, res) => {
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
          message: "Pupil could not be deleted",
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({
        result: "failure",
        message: "Error deleting pupil",
      });
      client.end();
    });
};

const restorePupil = (req, res) => {
  const { pupilID, pupilNickname, teacherID, overrideScore, overrideComment } = req.body;
  client
    .query("INSERT INTO pupil (pupil_id,pupil_nickname,teacher_id,last_update,override_score,override_comment) VALUES ($1,$2,$3, current_timestamp, $4,$5)", [pupilID, pupilNickname, teacherID, overrideScore, overrideComment])
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
      res.status(404).json({
        result: "failure",
        message: "Error inserting pupil",
      });

      client.end();
    });
};

const validateUser = (req, res) => {
  const { teacherUsername, teacherPassword } = req.body;
  // check if matches specific string
  if (teacherUsername === "benning123" && teacherPassword === "abc123") {
    res.status(200).json({ message: "login details correct", teacherID: "3" });
  } else {
    res.status(401).json({ error: "incorrect login details" });
  }
};

// endpoint to validate user credentials
app.get("/login", validateUser);
app.delete("/delete-pupil", deletePupil);
app.post("/restore-pupil", restorePupil);
