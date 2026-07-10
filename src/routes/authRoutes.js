const express = require("express");
const router = express.Router();

const {
    authLimiter
} =
require("../middleware/rateLimiter");

const {
    registerUser,
        loginUser

} = require(
    "../controllers/authController"
);

router.post(
    "/register",
    registerUser
);


router.post(
    "/login",
    authLimiter,
    loginUser
);

module.exports = router;