const request = require("supertest");

const app = require("../src/app");

describe("Driver API", () => {

    test("GET /api/drivers should return 200", async () => {

        const response = await request(app)

            .get("/api/drivers");

        expect(response.statusCode).toBe(200);

    });

});