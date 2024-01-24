const Exercise = require("../models/Exercise");
const User = require("../models/User");

const createExercise = async (req, res) => {
  const { description, duration, date } = req.body;

  const user = await User.findById(req._id);
  const exercise = await Exercise.create({
    description,
    duration,
    date,
    user_id: req._id,
  });
  if (!user) {
    res.json({ error: "User could not found" });
  } else {
    res.json({
      _id: user._id,
      username: user.username,
      date: exercise.date.toDateString(),
      duration: exercise.duration,
      description: exercise.description,
    });
  }
};

const getExercises = async (req, res) => {
  const userID = req._id;

  let { limit, to, from } = req.query;

  limit = limit !== undefined ? parseInt(limit) : undefined;

  const user = await User.findById(userID);
  if (!user) {
    res.json({ error: "User could not found" });
  } else {
    let query = { user_id: userID };

    if (from) {
      query.date = { $gte: new Date(from) };
    }

    if (to) {
      query.date = { ...query.date, $lte: new Date(to) };
    }

    const exercises = await Exercise.find(query).limit(limit);
    const formattedExercises = exercises.map((exercise) => ({
      ...exercise.toObject(),
      date: exercise.date.toDateString(),
    }));
    res.json({
      _id: userID,
      username: user.username,
      count: exercises.length,
      log: formattedExercises,
    });
  }
};

module.exports = { createExercise, getExercises };
