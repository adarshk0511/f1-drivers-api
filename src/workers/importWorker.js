const { Worker } = require("bullmq");
require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("../models/Job");

mongoose.connect(process.env.MONGO_URI);

const worker = new Worker(
  "import-race",

  async (job) => {
    const dbJob = await Job.findOne({
      bullJobId: job.id,
    });

    console.log("Bull Job ID:", job.id);

    console.log("DB Job Found:", dbJob);

    if (dbJob) {
      dbJob.status = "processing";

      await dbJob.save();
    }

    console.log("Processing:", job.data, job.id, dbJob.status);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    if (dbJob) {
      dbJob.status = "completed";

      await dbJob.save();
    }

    console.log("Completed:", job.data, job.id, dbJob.status);
  },

  {
    connection: {
      host: "redis",
      port: 6379,
    },
  },
);

console.log("Worker Started");
