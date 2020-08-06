const workout = require("../models/index.js");

module.exports = (app) => {
  app.get("/api/workouts", (req, res) => {
    workout
      .find({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        console.log("Error", err);
        res.json(err);
      });
  });
  app.post("/api/workouts", (req, res) => {
    workout
      .create({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        console.log("Error", err);
        res.json(err);
      });
  });
};
