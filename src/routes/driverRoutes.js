const express = require("express");

const router = express.Router();

const { getDrivers } = require("../controllers/driverController");

const validateDriver = require("../middleware/validateDriver");

const apiKey = require("../middleware/apiKey");

const { createDriver } = require("../controllers/driverController");
const { getDriverByAbbreviation } = require("../controllers/driverController");
const { getDriversByTeam } = require("../controllers/driverController");
router.get("/", apiKey, getDrivers);

router.post("/", validateDriver, createDriver);

router.get("/:abbr", getDriverByAbbreviation);

router.get("/:team", getDriversByTeam);

module.exports = router;
