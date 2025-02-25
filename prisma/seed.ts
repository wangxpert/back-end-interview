import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projections: any[] = [];

  fs.createReadStream(path.resolve(__dirname, "../Projection2021.csv"))
    .pipe(csv())
    .on("data", (row) => {
      projections.push({
        Attribute: row["Attribute"],
        Commodity: row["Commodity"],
        CommodityType: row["CommodityType"],
        Units: row["Units"],
        YearType: row["YearType"],
        Year: row["Year"],
        Value: parseFloat(row["Value"]),
      });
    })
    .on("end", async () => {
      await prisma.projection.createMany({
        data: projections,
      });
      console.log("CSV file successfully processed and data inserted");
      await prisma.$disconnect();
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  });
