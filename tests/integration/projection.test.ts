/* eslint-disable no-undef */
import request from "supertest";
import app from "../../src/app";
import { projections, insertProjections } from "../fixtures/projection.fixture";
import setupTestDB from "../utils/setupTestDB";

setupTestDB();

describe("Projecttion routes", () => {
  describe("GET /v1/projection/:column/histogram", () => {
    test("should return 200 and histogram for an existing column", async () => {
      await insertProjections(projections);
      const response = await request(app)
        .get("/v1/projection/Commodity/histogram")
        .send();
      expect(response.status).toBe(200);
      expect(response.text).toContain("<h1>Histogram for Commodity</h1>");
    });
  });
});
