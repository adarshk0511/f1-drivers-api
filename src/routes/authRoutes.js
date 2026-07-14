const express = require("express");
const router = express.Router();

const {
    authLimiter
} =
require("../middleware/rateLimiter");

const {
    registerUser,
        loginUser,
        refreshToken,
        logoutUser

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

router.post(
    "/logout",
    logoutUser
);

module.exports = router;