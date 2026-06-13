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
            .limit(limit)
            .lean();

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
    })
    .select("-_id -__v")
    .lean();

};

const searchDrivers = async (keyword) => {

    return await Driver.find({
        $or: [
            {
                fullName: {
                    $regex: keyword,
                    $options: "i"
                }
            },
            {
                abbreviation: {
                    $regex: keyword,
                    $options: "i"
                }
            }
        ]
    });

};

const createDriver = async (driverData) => {

    const driver = await Driver.create(driverData);

    return driver;
};

const updateDriver = async (
    abbreviation,
    updatedData
) => {

    return await Driver.findOneAndUpdate(
        {
            abbreviation
        },
        updatedData,
        {
            new: true
        }
    );

};

const deleteDriver = async (
    abbreviation
) => {

    return await Driver.findOneAndDelete({
        abbreviation
    });

};

const getAllDrivers1 = async (
    team,
    search,
    page = 1,
    limit = 5,
    sortField = "driverNumber",
    sortOrder = "asc"
) => {

    const filter = {};

    if (team) {
        filter.team = team;
    }

    if (search) {

        filter.$or = [
            {
                fullName: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                abbreviation: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];

    }

    const skip =
        (page - 1) * limit;

    const sortValue =
        sortOrder === "desc"
            ? -1
            : 1;

    const totalDrivers =
        await Driver.countDocuments(
            filter
        );

    const drivers =
        await Driver.find(filter)
            .select("-_id -__v")
            .sort({
                [sortField]: sortValue
            })
            .skip(skip)
            .limit(limit);

    return {
        totalDrivers,
        totalPages:
            Math.ceil(
                totalDrivers / limit
            ),
        currentPage: page,
        drivers
    };

};

module.exports = {
    getAllDrivers,
    getDriverByAbbreviation,
    searchDrivers,
    createDriver,
    updateDriver,
    deleteDriver,
    getAllDrivers1
};