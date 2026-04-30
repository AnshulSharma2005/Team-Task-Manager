const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: 'Pending' },
  assignedTo: String,
  deadline: Date,
  projectId: String
});
module.exports = mongoose.model('Task', TaskSchema);