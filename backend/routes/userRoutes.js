const express = require("express");
const router = express.Router();
const User = require("../models/User");

// CREATE USER
router.post("/", async (req, res) => {
  const { name, email, role } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ name, email, role });
    await user.save();
  }

  res.json(user);
});

// GET ALL USERS
router.get("/all", async (req, res) => {
  try {
    const users = await User.find(); // or your DB method

    if (!users) {
      return res.json([]); // never return null
    }

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET USER BY EMAIL
router.get("/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.json(user);
});

module.exports = router;