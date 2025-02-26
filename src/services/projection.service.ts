import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type HistogramItem = {
  value: string;
  count: number;
};

const queryHistogram = async (column: string) => {
  return prisma.$queryRaw<HistogramItem[]>(
    Prisma.sql`
        SELECT "${Prisma.raw(column)}" AS value, COUNT(*) AS count
        FROM "Projection"
        GROUP BY "${Prisma.raw(column)}"
        ORDER BY count DESC;
      `,
  );
};

export default {
  queryHistogram,
};
