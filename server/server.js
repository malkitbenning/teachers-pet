const express = require("express");
require("dotenv").config();

const app = express();

let cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const expressPort = process.env.PORT || 5000;

app.listen(expressPort, () => console.log(`Listening on expressPort ${expressPort}`));

const client = require("./db-client");

const deletePupil = require("./delete-pupil");
const restorePupil = require("./restore-pupil");

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
