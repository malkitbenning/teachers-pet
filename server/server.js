const express = require("express");

const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
let cors = require("cors");
app.use(cors());
const { client, connectDatabase } = require("./db-client");
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const expressPort = process.env.PORT || 5000;

app.listen(expressPort, () => console.log(`Listening on expressPort ${expressPort}`));

const client = require("./db-client");

const fetchPupilData = require("./fetchPupilData");
const deletePupil = require("./delete-pupil");
const restorePupil = require("./restore-pupil");

const validateUser = (req, res) => {
  const { teacherUsername, teacherPassword } = req.body;

  if (teacherUsername === "dbenning" && teacherPassword === "password") {
    res.status(200).json({ message: "Login successful.", teacherID: "3" });
  } else {
    res.status(401).json({ error: "Login failed, please try again." });
  }
};

app.listen(expressPort, () =>
  console.log(`Listening on expressPort ${expressPort}`)
);

app.get("/fetch-pupil-data", fetchPupilData);
app.post("/login", validateUser);
app.delete("/delete-pupil", deletePupil);
app.post("/restore-pupil", restorePupil);

