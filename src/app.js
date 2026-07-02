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
const deadLetterQueueRoutes =
    require("./routes/deadLetterQueueRoutes");
const requestId =
    require("./middleware/requestId");
const swaggerUi =
require("swagger-ui-express");

const swaggerSpec =
require("./config/swagger");

const app = express();

app.use(express.json());
app.use(logger);

(async () => {
  await redisClient.connect();

  console.log("Redis Connected");
})();

app.use(requestId);

app.use(
"/api/docs",
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);

app.use("/api/drivers", driverRoutes);
app.use("/api/teams", driverRoutes);

app.use("/api/import-race", importRoutes);
app.use("/api/jobs", jobRoutes);

app.use("/metrics", metricsRoutes);

app.use("/api/test", testRoutes);

app.use(
    "/api/dead-jobs",
    deadLetterQueueRoutes
);

app.use(notFound);
app.use(errorHandler);

module.exports = app;