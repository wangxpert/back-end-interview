/* eslint-disable n/no-unpublished-import */
import prisma from "../../src/config/prisma";
import { beforeAll, beforeEach, afterAll } from "@jest/globals";

const setupTestDB = () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.projection.deleteMany();
  });

  afterAll(async () => {
    await prisma.projection.deleteMany();
    await prisma.$disconnect();
  });
};

export default setupTestDB;
