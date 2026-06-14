const express = require("express");

const router = express.Router();

const {
  createDriver,
  getDrivers,
  getDriverByAbbreviation,
  searchDrivers,
  getDriversByTeam,
  updateDriver,
  deleteDriver,
  getDrivers1,
  getDriverGrid,
  getDriverStats
} = require("../controllers/driverController");

const validateDriver = require("../middleware/validateDriver");
const apiKey = require("../middleware/apiKey");

router.get("/", apiKey, getDrivers1);
router.post("/", validateDriver, createDriver);

router.get("/search/:keyword", searchDrivers);

router.get(
    "/grid",
    getDriverGrid
);

router.get(
    "/stats",
    getDriverStats
);

router.get("/:abbr", getDriverByAbbreviation);
router.put("/:abbr",  updateDriver);
router.delete("/:abbr", deleteDriver);

router.get("/:team", getDriversByTeam);



module.exports = router;
