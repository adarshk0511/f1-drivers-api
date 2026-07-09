const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError");

const authenticate = (req, res, next) => {

    try {

        // Step 1: Read Authorization Header
        const authHeader = req.headers.authorization;

        if (!authHeader) {

            throw new AppError(
                "Authorization header missing",
                401
            );

        }

        // Step 2: Check Header Format
        if (!authHeader.startsWith("Bearer ")) {

            throw new AppError(
                "Invalid Authorization header format",
                401
            );

        }

        // Step 3: Extract Token
        const token = authHeader.split(" ")[1];

        // Step 4: Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Step 5: Attach decoded payload to request
        req.user = decoded;

        next();

    }

    catch (error) {

        next(error);

    }

};

module.exports = authenticate;