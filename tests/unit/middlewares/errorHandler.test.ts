/* eslint-disable no-undef */
import request from "supertest";
import express from "express";
import httpStatus from "http-status";
import { errorHandler } from "../../../src/middlewares/error";
import ApiError from "../../../src/utils/ApiError";

const app = express();

// Middleware to simulate an error
app.get("/error", (req, res, next) => {
  next(new ApiError(httpStatus.BAD_REQUEST, "This is a test error"));
});

// Error handler middleware
app.use(errorHandler);

describe("Error Handler Middleware", () => {
  test("should return 400 and error message for a known error", async () => {
    const response = await request(app).get("/error").send();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      code: 400,
      message: "This is a test error",
    });
  });

  test("should return 500 and generic message for an unknown error in production", async () => {
    process.env.NODE_ENV = "production";
    const response = await request(app).get("/error").send();
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 500,
      message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
    });
    process.env.NODE_ENV = "test"; // Reset environment
  });

  test("should return 500 and stack trace for an unknown error in development", async () => {
    process.env.NODE_ENV = "development";
    const response = await request(app).get("/error").send();
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("stack");
    process.env.NODE_ENV = "test"; // Reset environment
  });
});
