const AppError = require("../utils/AppError");

const authorize = (...roles) => {

    return (req, res, next) => {

        // Ensure req.user exists
        if (!req.user) {

            return next(
                new AppError(
                    "Authentication required",
                    401
                )
            );

        }

        // Check whether the user's role is allowed
        if (!roles.includes(req.user.role)) {

            return next(
                new AppError(
                    "You do not have permission to perform this action",
                    403
                )
            );

        }

        next();

    };

};

module.exports = authorize;