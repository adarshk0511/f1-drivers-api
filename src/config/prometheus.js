const client = require("prom-client");

client.collectDefaultMetrics();

const raceImportCounter =
    new client.Counter({
        name:
            "race_import_requests_total",

        help:
            "Total number of race import requests"
    });

module.exports = {
    client,
    raceImportCounter
};