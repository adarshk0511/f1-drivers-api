const express = require("express");

const router = express.Router();

const {
    getDriversV2
} = require("../../controllers/driverController");

const authenticate =
    require("../../middleware/authMiddleware");


router.get(
    "/",
    authenticate,
    getDriversV2
);

module.exports = router;