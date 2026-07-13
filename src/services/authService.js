const logger = require("../config/logger");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const AppError =
require("../utils/AppError");
const jwt = require("jsonwebtoken");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../utils/jwt");

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
        throw new AppError(
            "User already exists",
            409
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

const loginUser = async (loginData) => {

    const { email, password } = loginData;

    // Step 1: Find the user
    const user = await User.findOne({ email });

    if (!user) {

        throw new AppError(
            "User not found",
            404
        );

    }

    // Step 2: Compare passwords
    const isPasswordCorrect =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isPasswordCorrect) {

        throw new AppError(
            "Invalid email or password",
            401
        );

    }

    // Step 3: Return user
    // Generate Access Token
    const accessToken =
        generateAccessToken({

            id: user._id,

            email: user.email,

            role: user.role,

        });

    // Generate Refresh Token
    const refreshToken =
        generateRefreshToken({

            id: user._id,

        });

    // Return Login Response
    return {

        user: {

            id: user._id,

            name: user.name,

            email: user.email,

            role: user.role,

        },

        accessToken,

        refreshToken,

    };

};

const refreshAccessToken = async (refreshToken) => {

    if (!refreshToken) {

        throw new AppError(

            "Refresh token missing",

            401

        );

    }

    // Verify Refresh Token
    const decoded = jwt.verify(

        refreshToken,

        process.env.REFRESH_TOKEN_SECRET

    );

    // Load latest user
    const user = await User.findById(decoded.id);

    if (!user) {

        throw new AppError(

            "User no longer exists",

            401

        );

    }

    // Generate new Access Token
    const accessToken = generateAccessToken({

        id: user._id,

        email: user.email,

        role: user.role,

    });

    return accessToken;

};

module.exports = {

    registerUser,
    loginUser,
    refreshAccessToken
};