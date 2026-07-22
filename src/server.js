require("dotenv").config();
const connectDB = require("./config/db");
const redisClient = require("./config/redis");
const logger = require("./config/logger"); // if you're using Pino
const { initializeQueues } = require("./config/queueManager");
const config = require("./config");
const mongoose = require("mongoose");
const app = require("./app");

const PORT = config.port || 5000;

async function startServer() {
  try {
    // MongoDB
    await connectDB();
    logger.info("MongoDB Connected");

    // Redis
    await redisClient.connect();
    logger.info("Redis Connected");

    //BullMQ Queues
    initializeQueues();
    logger.info("BullMQ Queues Initialized");

    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

    logger.info("6. app.listen returned");
    
    const shutdown = async (signal) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        logger.info("HTTP server closed.");

        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));

    process.on("SIGINT", () => shutdown("SIGINT"));

    logger.info("Graceful shutdown handlers registered");
  } catch (error) {
    logger.error(error, "Failed to start server");
    process.exit(1);
  }
}

startServer();
