const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// -------------------- MIDDLEWARE --------------------
// Enable CORS specifically for frontend port 5173
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// -------------------- ROUTES --------------------
app.use("/api/auth", authRoutes);

// -------------------- MONGODB CONNECTION --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// -------------------- TEST ROUTE --------------------
app.get("/add-test", async (req, res) => {
  try {
    const test = mongoose.connection.db.collection("testCollection");
    const result = await test.insertOne({ name: "Mahdi", role: "Student" });
    res.send(result);
  } catch (err) {
    res.status(500).send("Error inserting: " + err.message);
  }
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
