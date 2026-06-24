const { Worker } = require("bullmq");
require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("../models/Job");
// const { jobsProcessedCounter } = require("../config/prometheus");
const redisClient = require("../config/redis");

mongoose.connect(process.env.MONGO_URI);

const workerId = process.env.WORKER_ID || "worker-unknown";

(async () => {
  await redisClient.connect();

  console.log(`${workerId} Redis Connected`);
})();

const worker = new Worker(
  "import-race",

  async (job) => {
    try {
      console.log(`Attempt ${job.attemptsMade + 1}`);

      const startTime = Date.now();
      const dbJob = await Job.findById(job.data.dbJobId);

      console.log("Bull Job ID:", job.id, workerId);

      console.log("DB Job Found:", dbJob, workerId);

      if (dbJob) {
        dbJob.status = "processing";

        await dbJob.save();
      }

      console.log("Processing:", workerId, job.data, job.id, dbJob.status);

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
        console.log("Job Duration:", duration);
        console.log("Redis Counter Value:", value);
      }

      console.log("Completed:", job.data, job.id, dbJob.status);
    } catch (error) {
      console.error("Error processing job:", error);
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

console.log("Worker Started");
