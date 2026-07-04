require("dotenv").config();
const connectDB = require("./config/db");
const redisClient = require("./config/redis");
const logger = require("./config/logger"); // if you're using Pino
const {
    initializeQueues,
} = require("./config/queueManager");

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

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


        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });

    } catch (error) {
        logger.error(error, "Failed to start server");
        process.exit(1);
    }
}

startServer();