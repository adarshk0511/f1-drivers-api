const express = require("express");

const router = express.Router();

const { client } = require("../config/prometheus");
const redisClient = require("../config/redis");
const queueService = require("../services/queueService");

router.get("/", async (req, res) => {
  res.set("Content-Type", client.register.contentType);

  const jobsProcessed = await redisClient.get("jobs_processed_total");

  const waitingJobs = await queueService.getWaitingJobs();

  const metrics = await client.register.metrics();

  const customMetrics = `

        # HELP jobs_processed_total Total number of completed jobs
        # TYPE jobs_processed_total counter
        jobs_processed_total ${jobsProcessed || 0}

        # HELP queue_waiting_jobs Current waiting jobs
        # TYPE queue_waiting_jobs gauge
        queue_waiting_jobs ${waitingJobs}

        `;

  // res.end(
  //     await client.register.metrics()
  // );

  res.end(metrics + "\n" + customMetrics);
});

module.exports = router;
