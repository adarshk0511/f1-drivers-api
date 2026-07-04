const { Worker } = require("bullmq");
require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("../models/Job");
// const { jobsProcessedCounter } = require("../config/prometheus");
const logger = require("../config/logger");

const redisClient = require("../config/redis");
const {
    getDeadLetterQueue,
} = require("../config/queueManager");

mongoose.connect(process.env.MONGO_URI);

const workerId = process.env.WORKER_ID || "worker-unknown";

(async () => {
  await redisClient.connect();

  logger.info(
    {
      worker: workerId,
    },
    "Redis Connected",
  );
})();

const worker = new Worker(
  "import-race",

  async (job) => {
    try {
      logger.info(
        {
          worker: workerId,
          requestId: job.data.requestId,
          attempt: job.attemptsMade + 1,
          jobId: job.id,
        },
        "Processing Attempt",
      );

      const startTime = Date.now();
      const dbJob = await Job.findById(job.data.dbJobId);

      logger.info(
        {
          worker: workerId,
          requestId: job.data.requestId,
          bullJobId: job.id,
        },
        "Bull Job Received",
      );

      if (dbJob) {
        dbJob.status = "processing";

        await dbJob.save();
      }

      logger.info(
        {
          worker: workerId,
          requestId: job.data.requestId,
          jobId: job.id,
          raceName: job.data.raceName,
          status: dbJob.status,
        },
        "Processing Job",
      );

      await new Promise((resolve) => setTimeout(resolve, 10000));

      if (job.data.raceName === "FAIL") {
        throw new Error("Simulated Failure");
      }

      if (dbJob) {
        dbJob.status = "completed";

        await dbJob.save();

        // jobsProcessedCounter.inc();

        const value = await redisClient.incr("jobs_processed_total");

        const duration = (Date.now() - startTime) / 1000;
        await redisClient.incrByFloat("job_duration_sum", duration);
        await redisClient.incr("job_duration_count");

        logger.info(
          {
            worker: workerId,
            requestId: job.data.requestId,
            duration,
          },
          "Job Duration",
        );

        logger.info(
          {
            worker: workerId,
            requestId: job.data.requestId,
            jobsProcessed: value,
          },
          "Redis Counter Updated",
        );
      }

        logger.info({
          worker: workerId,
          requestId: job.data.requestId,
          jobId: job.id,
          mongoJobId: job.data.dbJobId,
          raceName: job.data.raceName,
          status: dbJob.status
      }, "Job Completed");
    } catch (error) {
      logger.error(
        {
          worker: workerId,
          requestId: job.data.requestId,
          jobId: job.id,
          error: error.message,
        },
        "Job Failed",
      );
      throw error;
    }
  },

  {
    connection: {
      host: "redis",
      port: 6379,
    },
  },
);

logger.info(
  {
    worker: workerId,
  },
  "Worker Started",
);

worker.on(
  "failed",

  async (job, error) => {
    console.log(`Job ${job.id} permanently failed`);

    const dbJob = await Job.findById(job.data.dbJobId);

    if (dbJob) {
      dbJob.status = "failed";

      await dbJob.save();
    }

    await redisClient.incr("jobs_failed_total");

    const deadLetterQueue =
    getDeadLetterQueue();
    await deadLetterQueue.add(
      "dead-job",

      {
        originalJobId: job.id,

        raceName: job.data.raceName,

        dbJobId: job.data.dbJobId,

        reason: error.message,

        failedAt: new Date(),
      },
    );

    console.log("Moved to Dead Letter Queue");
  },
);
