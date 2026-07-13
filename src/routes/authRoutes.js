const express = require("express");
const router = express.Router();

const {
    authLimiter
} =
require("../middleware/rateLimiter");

const {
    registerUser,
        loginUser,
        refreshToken

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

router.post(
    "/refresh",
    refreshToken
);

module.exports = router;