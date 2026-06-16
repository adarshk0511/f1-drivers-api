const express =
    require("express");

const router =
    express.Router();

const {
    importRace
} = require(
    "../controllers/importController"
);

router.post(
    "/",
    importRace
);

module.exports = router;