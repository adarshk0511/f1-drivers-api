const authService =
require("../services/authService");

const registerUser =
async (req, res) => {


    // Validation

    // Check email

    // Hash password

    // Save user

    // Generate JWT

    // Send Email

    // Logging

    // Analytics

    const user =
    await authService.registerUser(req.body);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
    });

};

module.exports = {

    registerUser,

};