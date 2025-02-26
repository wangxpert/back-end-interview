/* eslint-disable n/no-process-exit */
import { Server } from "http";
import app from "./app";
import prisma from "./config/prisma";
import config from "./config/config";
import logger from "./config/logger";

let server: Server;
prisma.$connect().then(() => {
  logger.info("Connected to SQL Database");
  server = app.listen(config.port, () => {
    logger.info(`🚀 Server running at http://localhost:${config.port}`);
    logger.info(`📚 Swagger docs at http://localhost:${config.port}/docs`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
