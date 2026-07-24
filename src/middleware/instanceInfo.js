const config = require("../config");

const instanceInfo = (req, res, next) => {

    res.locals.instanceName =
        config.instanceName;

    next();

};

module.exports = instanceInfo;