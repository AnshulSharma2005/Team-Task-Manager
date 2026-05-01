const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdBy: String
});

module.exports = mongoose.model("Project", ProjectSchema);