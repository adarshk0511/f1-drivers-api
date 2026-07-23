const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const { getQueueStats } = require("../controllers/testController");
const authorize = require("../middleware/authorize");

router.get("/queue-stats", getQueueStats);

router.get(
    "/protected",
    authenticate,
    authorize("admin"),
    (req,res)=>{
        res.json({
            success:true,
            message:"Admin Access Granted",
            user:req.user
        });
    }
);

router.get("/delay", async (req, res) => {

    await new Promise(resolve =>
        setTimeout(resolve, 15000)
    );

    res.json({

        success: true

    });

});

module.exports = router;
