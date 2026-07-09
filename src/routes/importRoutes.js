const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const { importRace } = require("../controllers/importController");

router.post(
  "/",
  authenticate,
  authorize("admin"),
  importRace,
);

module.exports = router;
