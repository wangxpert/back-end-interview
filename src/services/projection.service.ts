import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type HistogramItem = {
  value: string;
  count: number;
};

const queryHistogram = async (column: string, q: string) => {
  if (q === "") {
    return prisma.$queryRaw<HistogramItem[]>(
      Prisma.sql`
          SELECT "${Prisma.raw(column)}" AS value, COUNT(*) AS count
          FROM "Projection"
          GROUP BY "${Prisma.raw(column)}"
          ORDER BY count DESC;
        `,
    );
  }

  const count = await prisma.projection.count({
    where: {
      [column]: q,
    },
  });
  return [{ value: q, count: count }];
};

export default {
  queryHistogram,
};
