require("dotenv").config();
const connectDB = require("./config/db");

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
