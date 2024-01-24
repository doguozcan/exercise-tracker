const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  user_id: { type: String },
  description: { type: String },
  duration: { type: Number },
  date: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
