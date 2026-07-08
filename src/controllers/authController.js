const authService =
require("../services/authService");

const registerUser =
async (req, res) => {

    const user =
    await authService.registerUser(req.body);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
    });

};

const loginUser = async (req, res) => {

    const user =
        await authService.loginUser(
            req.body
        );

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
    });

};

module.exports = {

    registerUser,
    loginUser


};