const express = require("express");
const bodyParser = require("body-parser");
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

const validateUser = (req, res) => {
  const { teacherUsername, teacherPassword } = req.body;

  // Here we can add queries to search the DB once it's connected
  if (teacherUsername === "dbenning" && teacherPassword === "password") {
    res.status(200).json({ message: "Login successful.", teacherID: "3" });
  } else {
    res.status(401).json({ error: "Login failed, please try again." });
  }
};

// endpoint to validate user credentials
app.post("/login", validateUser);
