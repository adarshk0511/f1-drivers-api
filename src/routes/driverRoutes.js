const express = require("express");

const router = express.Router();

const {
    getDrivers
} = require("../controllers/driverController");

const {
    validateDriver
} = require("../middleware/validateDriver");

router.get("/", getDrivers);


const {
    createDriver
} = require("../controllers/driverController");

router.post("/", validateDriver, createDriver);

module.exports = router;