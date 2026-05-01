const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ FIXED CORS (for deployment)
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// ✅ DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Routes
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req,res)=> res.send("API Running"));

// ✅ FIXED PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));