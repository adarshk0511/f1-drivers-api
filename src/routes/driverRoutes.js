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
  getDriverStats,
  getTeamStats
} = require("../controllers/driverController");

const validateDriver = require("../middleware/validateDriver");
const apiKey = require("../middleware/apiKey");

/**
 * @swagger
 * /api/drivers:
 *   get:
 *     summary: Get all Formula 1 drivers
 *     description: Returns all drivers stored in MongoDB.
 *     tags:
 *       - Drivers
 *     responses:
 *       200:
 *         description: Drivers retrieved successfully.
 *       500:
 *         description: Internal Server Error.
 */
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

router.get(
    "/team-stats",
    getTeamStats
);

router.get("/:abbr", getDriverByAbbreviation);
router.put("/:abbr",  updateDriver);
router.delete("/:abbr", deleteDriver);

router.get("/:team", getDriversByTeam);



module.exports = router;
