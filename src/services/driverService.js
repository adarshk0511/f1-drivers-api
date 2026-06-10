const Driver = require("../models/Driver");

const getAllDrivers = async (
    team,
    page = 1,
    limit = 5
) => {

    

    const filter = {};
    const totalDrivers =
    await Driver.countDocuments(filter);
    
    if (team) {
        filter.team = team;
    }

    const skip = (page - 1) * limit;

    const drivers =  await Driver.find(filter)
        .skip(skip)
        .limit(limit);

    return {
        totalDrivers,
        totalPages:
            Math.ceil(totalDrivers / limit),
        currentPage: page,
        drivers
    };

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