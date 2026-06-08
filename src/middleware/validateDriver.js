const validateDriver = (req, res, next) => {
    const {
        driverNumber,
        fullName,
        abbreviation,
        team
    } = req.body;

    if (
        !driverNumber ||
        !fullName ||
        !abbreviation ||
        !team
    ) {
        return res.status(400).json({
            success: false,
            message: "Required fields missing"
        });
    }

    next();
};

module.exports = validateDriver;