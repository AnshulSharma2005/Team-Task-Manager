const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  name: String,
  members: [String]
});
module.exports = mongoose.model('Project', ProjectSchema);