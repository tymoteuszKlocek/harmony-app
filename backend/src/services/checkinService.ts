import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkinService = {
  createOrUpdate(
    userId: string,
    date: Date,
    data: {
      body?: string;
      mind?: string;
      relations?: string;
      nature?: string;
      mode?: string;
    },
  ) {
    return prisma.checkin.upsert({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
      update: {
        body: data.body,
        mind: data.mind,
        relations: data.relations,
        nature: data.nature,
        mode: data.mode || "default",
      },
      create: {
        userId,
        date,
        body: data.body,
        mind: data.mind,
        relations: data.relations,
        nature: data.nature,
        mode: data.mode || 'default',
      },
    });
  },

  getToday(userId: string) {
    const today = new Date();
    today.setHours(0,0,0,0);

    return prisma.checkin.findUnique({
        where: {
            userId_date: {
                userId,
                date: today,
            },
        },
    });
  },

  async getHistory(userId: string, from?: Date, to?: Date) {
    const where: any = { userId };

    if (from || to) {
      where.date = {};
      if (from) where.date.gte = from;
      if (to) where.date.lte = to;
    }

    return prisma.checkin.findMany({
      where,
      orderBy: {
        date: 'desc',
      },
    });
  },

  async getById(id: string, userId: string) {
    return prisma.checkin.findFirst({
      where: {
        id,
        userId,
      },
    });
  },
};
