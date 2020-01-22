const express = require("express");
const app = express();
const Workout = require("../models/workout");

// gets all workouts
app.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", (req, res) => {
  console.log(req.body);
  Workout.create({
    exercises: []
  })
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
  console.log(body);
  Workout.findByIdAndUpdate(
    params.id,
    {
      $push: { exercises: body }
    },
    { new: true, runValidators: true }
  )
    .then(Workout => {
      console.log(Workout);
      res.json(Workout);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = app;
