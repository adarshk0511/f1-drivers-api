const express = require("express");

const router = express.Router();

const {
    client
} = require(
    "../config/prometheus"
);

const redisClient =
    require(
        "../config/redis"
    );

router.get(
    "/",
    async (req, res) => {

        res.set(
            "Content-Type",
            client.register.contentType
        );

        const jobsProcessed =
    await redisClient.get(
        "jobs_processed_total"
    );

    const metrics =
    await client.register.metrics();

    const customMetric =

`# HELP jobs_processed_total Total number of completed jobs
# TYPE jobs_processed_total counter
jobs_processed_total ${jobsProcessed || 0}
`;

        // res.end(
        //     await client.register.metrics()
        // );

        res.end(
   metrics +
   "\n" +
   customMetric
);

    }
);

module.exports = router;