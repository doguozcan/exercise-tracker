const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const user = require("./routes/user");
const exercise = require("./routes/exercise");
const connectDB = require("./db/connect");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", user);
app.use(
  "/api/users/:_id/",
  (req, res, next) => {
    req._id = req.params._id;
    next();
  },
  exercise
);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
