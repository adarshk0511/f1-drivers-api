const Driver = require("../models/Driver");

const getAllDrivers = async () => {
    return await Driver.find();
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