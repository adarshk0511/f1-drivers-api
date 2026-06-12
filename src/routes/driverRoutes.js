const express = require("express");

const router = express.Router();

const {
  createDriver,
  getDrivers,
  getDriverByAbbreviation,
  searchDrivers,
  getDriversByTeam,
  updateDriver,
  deleteDriver
} = require("../controllers/driverController");

const validateDriver = require("../middleware/validateDriver");
const apiKey = require("../middleware/apiKey");

router.get("/", apiKey, getDrivers);
router.post("/", createDriver);
router.get("/search/:keyword", searchDrivers);

router.post("/", validateDriver, createDriver);

router.get("/:abbr", getDriverByAbbreviation);
router.put("/:abbr",  updateDriver);
router.delete("/:abbr", deleteDriver);
router.get("/:team", getDriversByTeam);



module.exports = router;
