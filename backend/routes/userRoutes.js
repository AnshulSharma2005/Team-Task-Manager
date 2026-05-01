const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ CREATE USER
router.post("/", async (req, res) => {
  try {
    const { name, email, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, role });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error("ERROR IN CREATE USER:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ GET ALL USERS (ONLY ONE)
router.get("/all", async (req, res) => {
  try {
    console.log("HIT /api/users/all");

    const users = await User.find();

    console.log("USERS:", users);

    res.json(users);
  } catch (error) {
    console.error("ERROR IN /users/all:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ GET USER BY EMAIL
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user);
  } catch (error) {
    console.error("ERROR IN GET USER:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;