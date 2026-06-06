const drivers = [
    {
        driverNumber: 1,
        name: "Max Verstappen",
        team: "Red Bull"
    },
    {
        driverNumber: 16,
        name: "Charles Leclerc",
        team: "Ferrari"
    }
];

const getDrivers = (req, res) => {

    res.json(drivers);

};

module.exports = {
    getDrivers
};