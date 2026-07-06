const request = require("supertest");

const app = require("../src/app");
const { api, API_KEY } =
require("./helpers/api");

describe("Driver API", () => {

    test("GET /api/drivers should return 200", async () => {

        const response = await request(app)

            .get("/api/drivers")
            .set("x-api-key", process.env.API_KEY);

        expect(response.statusCode).toBe(200);

    });

});