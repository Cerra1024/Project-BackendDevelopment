const express = require("express");
const Project = require("../models/Project");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

// Get all projects for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user._id,
    });

    res.json(projects);
  } catch (error) {
    console.error("GET PROJECTS ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Create project
router.post("/", protect, async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      user: req.user._id,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
