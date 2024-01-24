const User = require("../models/User");

const createUser = async (req, res) => {
  const username = req.body.username;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  } else {
    const createdUser = await User.create({ username: username });
    return res
      .status(201)
      .json({ username: createdUser.username, _id: createdUser._id });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(400).json({ error: "There is no user" });
    } else {
      return res.status(200).send(users);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, getUsers };
