const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: String,
  role: { type: String, enum: ['Admin','Member'], default: 'Member' }
});
module.exports = mongoose.model('User', UserSchema);

// models/Task.js
const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: 'Pending' },
  assignedTo: String,
  deadline: Date,
  projectId: String
});
module.exports = mongoose.model('Task', TaskSchema);
