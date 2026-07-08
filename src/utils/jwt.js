const jwt = require("jsonwebtoken");
const logger = require("../config/logger");

const generateToken = (user) => {

    logger.info(process.env.JWT_SECRET);
    return jwt.sign(

        {
            id: user.id,
            email: user.email,
            role: user.role,
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "1h",
        }

    );

};

module.exports = {

    generateToken,

};