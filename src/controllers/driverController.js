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

    const { team } = req.query;

    let filter = {};

    if (team) {
        filter.team = team;
    }

    const drivers = await Driver.find(filter);

    res.json(drivers);
};

const getDriverByAbbreviation = async (req, res) => {

    const driver = await Driver.findOne({
        abbreviation: req.params.abbr
    });

    if (!driver) {
        return res.status(404).json({
            message: "Driver not found"
        });
    }

    res.json(driver);
};

const getDriversByTeam = async (req, res) => {

    const drivers = await Driver.find({
        team: req.params.team
    });

    res.json(drivers);
};


module.exports = {
    createDriver, getDrivers, getDriverByAbbreviation, getDriversByTeam
};