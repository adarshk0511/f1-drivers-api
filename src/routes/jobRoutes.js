const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const { getJobStatus } = require("../controllers/jobController");

router.get("/:id", authenticate, getJobStatus);

module.exports = router;
