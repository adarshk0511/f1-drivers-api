require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");

const logger = require("./middleware/logger");

const driverRoutes = require("./routes/driverRoutes");

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/drivers", driverRoutes);
app.use("/api/teams", driverRoutes);
const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});