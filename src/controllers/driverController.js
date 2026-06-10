const Driver = require("../models/Driver");
const driverService = require("../services/driverService");

const createDriver = async (req, res) => {
  try {
    const driver = await Driver.create(req.body);

    res.status(201).json(driver);
  } catch (error) {
    next(error);
  }
};

const getDrivers = async (
    req,
    res,
    next
) => {

    try {

        const team = req.query.team;

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 5;

        const drivers =
            await driverService.getAllDrivers(
                team,
                page,
                limit
            );

        res.json(drivers);

    } catch (error) {

        next(error);

    }

};

const getDriverByAbbreviation = async (
    req,
    res,
    next
) => {

    try {

        const driver =
            await driverService.getDriverByAbbreviation(
                req.params.abbr
            );

        if (!driver) {

            return res.status(404).json({
                success: false,
                message: "Driver not found"
            });

        }

        res.json(driver);

    } catch (error) {

        next(error);

    }

};

const getDriversByTeam = async (req, res) => {
  try {
    const drivers = await Driver.find({
      team: req.params.team,
    });

    res.json(drivers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDriver,
  getDrivers,
  getDriverByAbbreviation,
  getDriversByTeam,
};
