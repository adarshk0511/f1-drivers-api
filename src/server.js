require("dotenv").config();
const connectDB = require("./config/db");
const redisClient = require("./config/redis");
const express = require("express");
const importRoutes = require("./routes/importRoutes");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const driverRoutes = require("./routes/driverRoutes");
const jobRoutes = require("./routes/jobRoutes");
const metricsRoutes = require("./routes/metricsRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(express.json());
app.use(logger);

(async () => {
  await redisClient.connect();

  console.log("Redis Connected");
})();

app.use("/api/drivers", driverRoutes);
app.use("/api/teams", driverRoutes);

app.use("/api/import-race", importRoutes);
app.use("/api/jobs", jobRoutes);

app.use("/metrics", metricsRoutes);

app.use("/api/test", testRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
