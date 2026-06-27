const express = require("express");

const router = express.Router();

const {
    getDeadJobs
} = require("../controllers/deadLetterQueueController");

router.get(
    "/",
    getDeadJobs
);

module.exports = router;