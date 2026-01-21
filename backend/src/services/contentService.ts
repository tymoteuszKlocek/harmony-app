import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const contentService = {
  async getQuestions(mode: string = 'default') {
    const areas = ['body', 'mind', 'relations', 'nature'];
    const questions = [];

    for (const area of areas) {
      const areaQuestions = await prisma.question.findMany({
        where: {
          area,
          mode,
          active: true,
        },
        orderBy: {
          order: 'asc',
        },
      });

      if (areaQuestions.length > 0) {
        // Pick random question for this area
        const randomIndex = Math.floor(Math.random() * areaQuestions.length);
        questions.push(areaQuestions[randomIndex]);
      }
    }

    return questions;
  },

  async getRandomQuote() {
    const quotes = await prisma.quote.findMany({
      where: {
        active: true,
      },
    });

    if (quotes.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  },
};