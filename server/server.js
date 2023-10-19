const express = require("express");

const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
let cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const expressPort = process.env.PORT || 5000;

app.listen(expressPort, () =>
  console.log(`Listening on expressPort ${expressPort}`)
);

const getQandA = require("./getQandA");
const fetchPupilData = require("./fetchPupilData");
const deletePupil = require("./delete-pupil");
const restorePupil = require("./restore-pupil");
const validateUser = require("./validate-user");
const saveUserFormInput = require("./save-user-form-input");
const getPupilRecord = require("./get-pupil-record");
const getPupilAnswers = require("./get-pupil-answers");

app.get("/getQandA", getQandA);
app.post("/fetch-pupil-data", fetchPupilData);
app.delete("/delete-pupil", deletePupil);
app.post("/restore-pupil", restorePupil);
app.post("/login", validateUser);
app.post("/save-user-form-input", saveUserFormInput);
app.post("/get-pupil-record", getPupilRecord);
app.post("/get-pupil-answers", getPupilAnswers);
