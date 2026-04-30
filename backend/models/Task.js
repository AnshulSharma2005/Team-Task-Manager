const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    },

    // 🔥 Who created the task
    createdBy: {
      type: String, // later can be ObjectId (User)
      required: true
    },

    // 🔥 Who is assigned to task
    assignedTo: {
      type: String, // user email or id
      required: true
    },

    // 🔥 Project reference
    projectId: {
      type: String, // later convert to ObjectId (Project)
      required: true
    },

    // 🔥 Deadline (important for overdue logic)
    deadline: {
      type: Date
    },

    // 🔥 Priority (adds real-world usability)
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    }
  },
  {
    timestamps: true // 🔥 createdAt & updatedAt auto
  }
);

module.exports = mongoose.model('Task', TaskSchema);