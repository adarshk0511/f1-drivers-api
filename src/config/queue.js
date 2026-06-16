const { Queue } = require("bullmq");

const importQueue = new Queue(
    "import-race",
    {
        connection: {
            host: "redis",
            port: 6379
        }
    }
);

module.exports = importQueue;