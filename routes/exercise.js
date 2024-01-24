const express = require("express");
const router = express.Router();

const { getExercises, createExercise } = require("../controllers/exercise");

router.route("/exercises").post(createExercise);
router.route("/logs").get(getExercises);

module.exports = router;
