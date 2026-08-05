require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

const MONGO_URL = process.env.MONGODB_URI
app.get("/", (_req, res) => {
  res.json({ message: "Server is working ✅" });
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB is connected ✅");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed ❌");
    console.error(error);
    process.exit(1);
  }
}

startServer();