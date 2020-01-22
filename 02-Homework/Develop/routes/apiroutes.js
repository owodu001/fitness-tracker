const app = express();
const workout = require("../models/workout");

app.get("/api/workouts", (req, res) => {
  workout
    .find({})
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = app;
