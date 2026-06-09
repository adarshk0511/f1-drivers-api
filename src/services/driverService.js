const Driver = require("../models/Driver");

const getAllDrivers = async () => {
    return await Driver.find();
};

module.exports = {
    getAllDrivers
};