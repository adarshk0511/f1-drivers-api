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
    try{
      
    
    const dbJob = await Job.findById(job.data.dbJobId);

    console.log("Bull Job ID:", job.id, workerId);

    console.log("DB Job Found:", dbJob, workerId);

    if (dbJob) {
      dbJob.status = "processing";

      await dbJob.save();
    }

    console.log("Processing:", workerId, job.data, job.id, dbJob.status);

    await new Promise((resolve) => setTimeout(resolve, 10000));

    if (dbJob) {
      dbJob.status = "completed";

      await dbJob.save();

      console.log("STEP 1");

      // jobsProcessedCounter.inc();

      console.log("STEP 2");

      const value = await redisClient.incr("jobs_processed_total");

      console.log("STEP 3");

      console.log("Redis Counter Value:", value);
    }

    console.log("Completed:", job.data, job.id, dbJob.status);
    }
    catch (error) {
      console.error("Error processing job:", error);
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
