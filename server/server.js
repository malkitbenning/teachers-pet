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

const client = require("./db-client");

const deletePupil = require("./delete-pupil");
const restorePupil = require("./restore-pupil");
const validateUser = require("./validate-user");

app.post("/login", validateUser);
app.delete("/delete-pupil", deletePupil);
app.post("/restore-pupil", restorePupil);
