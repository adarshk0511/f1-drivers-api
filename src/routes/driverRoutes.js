const express = require("express");

const router = express.Router();

const {
    getDrivers
} = require("../controllers/driverController");

router.get("/", getDrivers);


const {
    createDriver
} = require("../controllers/driverController");

router.post("/", createDriver);

module.exports = router;