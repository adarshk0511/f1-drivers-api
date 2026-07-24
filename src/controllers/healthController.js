const config = require("../config");
const logger = require("../config/logger");
const getHealth = (req, res) => {

    logger.info(
        `Health check requested from instance: ${config.instanceName}`
    );
res.json({

    status:"UP",

    instance:
        config.instanceName,

    timestamp:
        new Date().toISOString()

});

};

module.exports = {

    getHealth

};