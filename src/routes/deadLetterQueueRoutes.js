const express = require("express");

const router = express.Router();

const {
    getDeadJobs,
    retryDeadJob
} = require("../controllers/deadLetterQueueController");

router.get(
    "/",
    getDeadJobs
);

router.post(
    "/:id/retry",
    retryDeadJob
);

module.exports = router;