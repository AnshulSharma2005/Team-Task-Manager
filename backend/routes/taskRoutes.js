const router = require('express').Router();
const Task = require('../models/Task');

router.post('/', async (req,res)=>{
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

router.get('/', async (req,res)=>{
  const tasks = await Task.find();
  res.json(tasks);
});

router.put('/:id', async (req,res)=>{
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
