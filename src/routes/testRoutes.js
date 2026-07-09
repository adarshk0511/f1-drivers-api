const express =
    require("express");

    const authenticate =
require("../middleware/authMiddleware");

const router =
    express.Router();

const {
    getQueueStats
} = require(
    "../controllers/testController"
);

router.get(
    "/queue-stats",
    getQueueStats
);


router.get(
    "/protected",
    authenticate,
    (req,res)=>{
        res.json({
            success: true,
            message: "Protected Route Accessed",
            user: req.user,
        });
    }
);

module.exports =
    router;