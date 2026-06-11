const Driver = require("../models/Driver");


const getAllDrivers = async (
    team,
    page = 1,
    limit = 5,
    sortField = "driverNumber",
    sortOrder = "asc"
) => {

    const filter = {};

    if (team) {
        filter.team = team;
    }

    const skip = (page - 1) * limit;

    const totalDrivers =
        await Driver.countDocuments(filter);

    const sortValue =
        sortOrder === "desc" ? -1 : 1;

    const drivers =
        await Driver.find(filter)
            .sort({
                [sortField]: sortValue
            })
            .skip(skip)
            .limit(limit);

    return {
        totalDrivers,
        totalPages: Math.ceil(totalDrivers / limit),
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