const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS (simple for now)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ REQUEST LOGGER (NEW)
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// ✅ HEALTH CHECK (VERY IMPORTANT)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

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

// ✅ ROOT ROUTE
app.get('/', (req, res) => {
  res.send("API Running");
});

// ✅ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ message: "Something went wrong" });
});

// ✅ PORT FIX (CRITICAL)
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});