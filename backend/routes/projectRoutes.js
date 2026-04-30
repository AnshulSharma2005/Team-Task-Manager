const router = require('express').Router();
const Project = require('../models/Project');

router.post('/', async (req,res)=>{
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

router.get('/', async (req,res)=>{
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;
