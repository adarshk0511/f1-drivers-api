const Driver = require("../models/Driver");

const getAllDrivers = async (team) => {
     const filter = {};

    if (team) {
        filter.team = team;
    }

    return await Driver.find(filter);
};

const getDriverByAbbreviation = async (abbr) => {

    return await Driver.findOne({
        abbreviation: abbr
    });

};

module.exports = {
    getAllDrivers,
    getDriverByAbbreviation
};