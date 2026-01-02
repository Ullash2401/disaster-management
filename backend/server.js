const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});


app.get("/add-test", async (req, res) => {
  try {
    const test = mongoose.connection.db.collection("testCollection");
    const result = await test.insertOne({ name: "Mahdi", role: "Student" });
    res.send(result);
  } catch (err) {
    res.status(500).send("Error inserting: " + err.message);
  }
});