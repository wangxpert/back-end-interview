import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import * as fs from "fs";
import * as path from "path";
import httpStatus from "http-status";
import routes from "./routes/v1";
import config from "./config/config";
import morgan from "./config/morgan";
import { errorHandler } from "./middlewares/error";
import ApiError from "./utils/ApiError";

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// v1 api routes
app.use("/v1", routes);

// swagger docs
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/docs/swagger.json"), "utf8"),
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// handle errors
app.use(errorHandler);

export default app;
