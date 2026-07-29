require("dotenv").config();

const express = require("express");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const requestId = require("./middleware/requestId");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const driverRoutes = require("./routes/driverRoutes");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser =
    require("cookie-parser");
const compression = require("compression");
const requestTimeout =
    require("./middleware/requestTimeout");
const instanceInfo =
require("./middleware/instanceInfo");
const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Compression
app.use(compression());

// Parse JSON
app.use(express.json());
app.use(cookieParser());


// Logging
app.use(logger);
app.use(instanceInfo);

app.use(requestId);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(requestTimeout(10000));
app.use("/api/v1", driverRoutes);




app.use(notFound);
app.use(errorHandler);

module.exports = app;
