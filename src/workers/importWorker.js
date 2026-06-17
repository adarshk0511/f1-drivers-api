const { Worker } = require("bullmq");
require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("../models/Job");

mongoose.connect(process.env.MONGO_URI);

const workerId =
    process.env.WORKER_ID ||
    "worker-unknown";

const worker = new Worker(
  "import-race",

  async (job) => {
    const dbJob =
    await Job.findById(
        job.data.dbJobId
    );

    console.log("Bull Job ID:", job.id, workerId  );

    console.log("DB Job Found:", dbJob, workerId  );

    if (dbJob) {
      dbJob.status = "processing";

      await dbJob.save();
    }

    console.log("Processing:", workerId, job.data, job.id, dbJob.status);

    await new Promise((resolve) => setTimeout(resolve, 10000));

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
