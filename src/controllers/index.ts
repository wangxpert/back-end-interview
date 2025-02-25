/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getHistogram = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const column = req.params.column;

  // STEP 1: Validate column name
  const possibleColumns = Prisma.dmmf.datamodel.models[0].fields
    .map((field) => field.name)
    .filter((col) => col !== "id");
  if (!possibleColumns.includes(column)) {
    return res.status(400).send(`<h1>Invalid column: ${column}</h1>`);
  }

  try {
    // STEP 2: Query the database for the histogram data
    const result = await prisma.$queryRaw<{ value: string; count: number }[]>(
      Prisma.sql`
        SELECT "${Prisma.raw(column)}" AS value, COUNT(*) AS count
        FROM "Projection"
        GROUP BY "${Prisma.raw(column)}"
        ORDER BY count DESC;
      `,
    );

    // STEP 3: Convert query result to HTML
    let html = `<h1>Histogram for ${column}</h1><ul>`;
    result.forEach(({ value, count }) => {
      html += `<li>${value}: ${count}</li>`;
    });
    html += "</ul>";

    return res.send(html);
  } catch (error) {
    console.error("Error fetching histogram:", error);
    return res.status(500).send("<h1>Server Error</h1>");
  }
};
