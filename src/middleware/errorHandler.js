const logger = require("../config/logger");

const errorHandler = (
    err,
    req,
    res,
    next
) => {

    const statusCode =
        err.statusCode || 500;

    logger.error(
        {
            requestId: req.requestId,
            method: req.method,
            url: req.originalUrl,
            statusCode,
            error: err.message,
            stack: err.stack
        },
        "Unhandled Exception"
    );

    res.status(statusCode).json({

        success: false,

        requestId: req.requestId,

        message: err.message ||

            "Internal Server Error"

    });

};

module.exports = errorHandler;