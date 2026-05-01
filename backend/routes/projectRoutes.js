const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// CREATE PROJECT
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (error) {
    console.error("ERROR IN CREATE PROJECT:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET PROJECTS
router.get("/", async (req, res) => {
  try {
    console.log("🔥 HIT /api/projects");

    const projects = await Project.find();

    console.log("✅ PROJECTS:", projects);

    res.json(projects);

  } catch (error) {
    console.error("❌ ERROR IN /projects:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;