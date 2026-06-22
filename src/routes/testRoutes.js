const express =
    require("express");

const router =
    express.Router();

const {
    getQueueStats
} = require(
    "../controllers/testController"
);

router.get(
    "/queue-stats",
    getQueueStats
);

module.exports =
    router;