const db = require("../models");
const { workout } = require("../models");

module.exports = (app) => {
  //gets all workouts including duration for resistance workouts
  app.get("/api/workouts", (req, res) => {
    db.workout
      .find({})
      .then((dbWorkout) => {
        dbWorkout.forEach((workout) => {
          var total = 0;
          // console.log("what is", workout.exercises);
          workout.exercises.forEach((exercise) => {
            total += exercise.duration;
          });
          workout.totalDuration = total;
        });
        res.json(dbWorkout);
      })
      .catch((err) => {
        console.log("Error", err);
        res.json(err);
      });
  });
  app.post("/api/workouts", (req, res) => {
    db.workout
      .create({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        console.log("Error", err);
        res.json(err);
      });
  });
  app.put("/api/workouts/:id", ({ body, params }, res) => {
    db.workout
      .findByIdAndUpdate(
        params.id,
        { $inc: { totalDuration: body.duration }, $push: { exercises: body } },
        { new: true }
      )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        console.log("Error", err);
        res.json(err);
      });
  });
  app.get("/api/workouts/range", (req, res) => {
    db.workout
      .find({})
      // .limit(3)
      .then((dbWorkout) => {
        console.log("all workouts", dbWorkout);
        res.json(dbWorkout);
      })
      .catch((err) => {
        console.log("Error", err);
        res.json(err);
      });
  });
};
