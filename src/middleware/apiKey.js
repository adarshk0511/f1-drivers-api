const apiKey = (req, res, next) => {

    const key = req.headers["x-api-key"];

    if (key !== "f1-secret") {
        return res.status(401).json({
            message: "Invalid API Key"
        });
    }

    next();
};

module.exports = apiKey;