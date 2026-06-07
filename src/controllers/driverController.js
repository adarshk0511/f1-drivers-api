const Driver = require("../models/Driver");

const createDriver = async (req, res) => {

    try {

        const driver = await Driver.create(req.body);

        res.status(201).json(driver);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getDrivers = async (req, res) => {

    try {

        const drivers = await Driver.find();

        res.json(drivers);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createDriver, getDrivers
};