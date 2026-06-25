const express = require("express");

const router = express.Router();

const { client } = require("../config/prometheus");
const redisClient = require("../config/redis");
const queueService = require("../services/queueService");

router.get("/", async (req, res) => {
  res.set("Content-Type", client.register.contentType);

  const jobsProcessed = await redisClient.get("jobs_processed_total");

  const jobsFailed =
    await redisClient.get(
        "jobs_failed_total"
    ) || 0;

  const durationSum =
    parseFloat(
        await redisClient.get(
            "job_duration_sum"
        )
    ) || 0;

const durationCount =
    parseInt(
        await redisClient.get(
            "job_duration_count"
        )
    ) || 0;

    const averageDuration =
    durationCount > 0
        ? durationSum /
          durationCount
        : 0;
  const waitingJobs = await queueService.getWaitingJobs();

  const metrics = await client.register.metrics();

  const customMetrics = `

        # HELP jobs_processed_total Total number of completed jobs
        # TYPE jobs_processed_total counter
        jobs_processed_total ${jobsProcessed || 0}

        # HELP queue_waiting_jobs Current waiting jobs
        # TYPE queue_waiting_jobs gauge
        queue_waiting_jobs ${waitingJobs}

        # HELP average_job_duration_seconds Average job duration
        # TYPE average_job_duration_seconds gauge
        average_job_duration_seconds ${averageDuration}

        # HELP jobs_failed_total Total permanently failed jobs
        # TYPE jobs_failed_total counter
        jobs_failed_total ${jobsFailed}

        `;

  // res.end(
  //     await client.register.metrics()
  // );

  res.end(metrics + "\n" + customMetrics);
});

module.exports = router;
