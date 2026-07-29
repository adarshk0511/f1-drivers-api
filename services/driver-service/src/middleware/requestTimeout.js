const requestTimeout = (timeout = 10000) => {
    return (req, res, next) => {

        const timer = setTimeout(() => {

            if (!res.headersSent) {

                res.status(408).json({

                    success: false,

                    message: "Request timed out"

                });

            }

        }, timeout);

        res.on("finish", () => clearTimeout(timer));

        res.on("close", () => clearTimeout(timer));

        next();
    };
};

module.exports = requestTimeout;