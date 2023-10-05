const express = require("express");
const app = express();

let cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const expressPort = process.env.PORT || 5000;

app.listen(expressPort, () =>
  console.log(`Listening on expressPort ${expressPort}`)
);

app.get("/", function (req, res) {
  const testScore = Math.floor(Math.random() * 100);
  res.status(200).json({
    pupilName: "Thomas",
    pupilScore: testScore,
  });
});

app.post("/pupilRecord", (req, res) => {
  if (!req.body.pupilName || !req.body.pupilScore) {
    res.status(400).json({
      result: "failure",
      message: "Pupil details could not be saved",
    });
  }
  let reqPupilName = req.body.pupilName;
  console.log("pupil name", reqPupilName);
  res.status(201).json({
    pupilName: reqPupilName,
  });
});
