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
    });
    test("should match the histogram HTML structure with any column name", async () => {
      await insertProjections(projections);
      const response = await request(app)
        .get("/v1/projection/Commodity/histogram")
        .send();
      expect(response.text).toMatch(
        /^<h1>Histogram for [^<]+<\/h1><ul>(<li>[^<]+<\/li>)+<\/ul>$/,
      );
    });
    test("should return 400 for an invalid column", async () => {
      await insertProjections(projections);
      const response = await request(app)
        .get("/v1/projection/InvalidColumn/histogram")
        .send();
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error:
          '"column" must be one of [Attribute, Commodity, CommodityType, Units, YearType, Year, Value]',
      });
    });
  });
});

describe("Error handling", () => {
  describe("POST /v1/unknown", () => {
    test("should return 404 for an invalid route", async () => {
      const response = await request(app).post("/v1/unknown").send();
      expect(response.status).toBe(404);
    });
  });
});
