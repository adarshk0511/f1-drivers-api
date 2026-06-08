const Driver = require("../models/Driver");

const createDriver = async (req, res) => {
  try {
    const driver = await Driver.create(req.body);

    res.status(201).json(driver);
  } catch (error) {
    next(error);
  }
};

const getDrivers = async (req, res) => {
  try {
    const { team } = req.query;

    let filter = {};

    if (team) {
      filter.team = team;
    }

    const drivers = await Driver.find(filter);

    res.json(drivers);
  } catch (error) {
    next(error);
  }
};

const getDriverByAbbreviation = async (req, res) => {
    try{
          const driver = await Driver.findOne({
    abbreviation: req.params.abbr,
  });

  if (!driver) {
    return res.status(404).json({
      message: "Driver not found",
    });
  }

  res.json(driver);
    }
    catch(error){
        next(error);
    }
};

const getDriversByTeam = async (req, res) => {
  try{
    const drivers = await Driver.find({
    team: req.params.team,
  });

  res.json(drivers);
  }
  catch(error){
    next(error);
  } 
};

module.exports = {
  createDriver,
  getDrivers,
  getDriverByAbbreviation,
  getDriversByTeam,
};
