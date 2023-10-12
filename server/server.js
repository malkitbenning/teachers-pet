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

app.listen(expressPort, () =>
  console.log(`Listening on expressPort ${expressPort}`)
);

const fetchPupilData = require("./fetchPupilData");
const deletePupil = require("./delete-pupil");
const restorePupil = require("./restore-pupil");
const validateUser = require("./validate-user");

app.get("/fetch-pupil-data", fetchPupilData);
app.post("/login", validateUser);
app.delete("/delete-pupil", deletePupil);
app.post("/restore-pupil", restorePupil);
