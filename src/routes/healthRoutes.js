const express = require("express");
const config = require("../config");
const router = express.Router();

const {
    getHealth
} = require("../controllers/healthController");

router.get("/", getHealth);

module.exports = router;