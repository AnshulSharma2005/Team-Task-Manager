const router = require('express').Router();
const Task = require('../models/Task');

// CREATE TASK
router.post('/', async (req, res) => {
  try {
    const { createdBy, assignedTo, role } = req.body;

    if (role !== "Admin" && assignedTo !== createdBy) {
      return res.status(403).json({ error: "Not allowed" });
    }

    const task = new Task(req.body);
    await task.save();

    res.json(task);
  } catch (error) {
    console.error("ERROR IN CREATE TASK:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET TASKS
router.get("/", async (req, res) => {
  try {
    console.log("🔥 HIT /api/tasks");

    const tasks = await Task.find();

    console.log("✅ TASKS:", tasks);

    res.json(tasks);

  } catch (error) {
    console.error("❌ ERROR IN /tasks:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE TASK
router.put('/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error("ERROR IN UPDATE TASK:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("ERROR IN DELETE TASK:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;