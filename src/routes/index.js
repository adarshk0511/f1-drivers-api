const express = require("express");

const router = express.Router();

router.use("/auth", require("./v1/authRoutes"));
router.use("/drivers", require("./v1/driverRoutes"));
router.use("/jobs", require("./v1/jobRoutes"));


//router.use("/v2/drivers", require("./v2/driverRoutes"));

module.exports = router;