const express = require("express");

const router = express.Router();

const {
    getDrivers
} = require("../controllers/driverController");

const {
    validateDriver
} = require("../middleware/validateDriver");

const {
    apiKey
} = require("../middleware/apiKey");

router.get("/", apiKey, getDrivers);


const {
    createDriver
} = require("../controllers/driverController");

router.post("/", validateDriver, createDriver);

module.exports = router;