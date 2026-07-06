const request = require("supertest");
const app = require("../../src/app");

const api = request(app);

const API_KEY = {
    "x-api-key": process.env.API_KEY
};

module.exports = {
    api,
    API_KEY
};