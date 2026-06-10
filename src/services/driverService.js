const Driver = require("../models/Driver");

const getAllDrivers = async (
    team,
    page = 1,
    limit = 5
) => {

    const filter = {};

    if (team) {
        filter.team = team;
    }

    const skip = (page - 1) * limit;

    return await Driver.find(filter)
        .skip(skip)
        .limit(limit);

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