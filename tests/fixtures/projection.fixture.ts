/* eslint-disable n/no-unpublished-import */
import { faker } from "@faker-js/faker";
import prisma from "../../src/config/prisma";
import { Prisma } from "@prisma/client";

const CommodityValues = [
  "Rice",
  "Barley",
  "Corn",
  "Upland Cotton",
  "Oats",
  "Sorghum",
  "Soybeans",
  "Wheat",
];

export const projections = Array.from({ length: 10 }, () => ({
  Attribute: faker.word.words({ count: { min: 1, max: 3 } }),
  Commodity: faker.helpers.arrayElement(CommodityValues),
  CommodityType: faker.word.words({ count: { min: 1, max: 3 } }),
  Units: faker.word.noun(),
  YearType: "Market Year",
  Year: `${faker.number.int({ min: 2020, max: 2025 })}`,
  Value: faker.number.float(),
}));

export const insertProjections = async (
  data: Prisma.ProjectionCreateManyInput[],
) => {
  await prisma.projection.createMany({ data });
};
