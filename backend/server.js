const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ SIMPLE CORS (IMPORTANT)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("Mongo Error:", err);
  });

// ✅ Routes
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
  res.send("API Running");
});

// ✅ ERROR HANDLER (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ message: "Something went wrong" });
});

// ✅ PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});