const logger = require("../config/logger");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (userData) => {

    console.log("User received in service:");

     const {
        name,
        email,
        password,
    } = userData;

    const existingUser =
    await User.findOne({
        email,
    });

    if (existingUser) {
        throw new Error(
            "User already exists"
        );
    }

    const hashedPassword =
    await bcrypt.hash(password, 10);

    const user =
    await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
    };

    logger.info(
        "Email is available"
    );
};

module.exports = {

    registerUser,

};