const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

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
    authenticate,
    authorize("admin"),
    retryDeadJob
);

module.exports = router;