import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Default mode questions
  const defaultQuestions = [
    // Body
    { area: 'body', mode: 'default', text: 'How do you feel physically?', order: 1 },
    { area: 'body', mode: 'default', text: 'What does your body need today?', order: 2 },
    { area: 'body', mode: 'default', text: 'How did you take care of yourself today?', order: 3 },
    
    // Mind
    { area: 'mind', mode: 'default', text: "What's on your mind today?", order: 1 },
    { area: 'mind', mode: 'default', text: 'What are you grateful for?', order: 2 },
    { area: 'mind', mode: 'default', text: 'What challenged you today?', order: 3 },
    
    // Relations
    { area: 'relations', mode: 'default', text: 'Who mattered today?', order: 1 },
    { area: 'relations', mode: 'default', text: 'How did you connect with others?', order: 2 },
    { area: 'relations', mode: 'default', text: 'Who needs your attention?', order: 3 },
    
    // Nature
    { area: 'nature', mode: 'default', text: 'Were you outside today?', order: 1 },
    { area: 'nature', mode: 'default', text: 'What did you notice in nature?', order: 2 },
    { area: 'nature', mode: 'default', text: 'How did nature make you feel?', order: 3 },
  ];

  // Forest mode questions
  const forestQuestions = [
    // Body
    { area: 'body', mode: 'forest', text: 'How does the forest ground you?', order: 1 },
    { area: 'body', mode: 'forest', text: 'What sensations do you feel?', order: 2 },
    
    // Mind
    { area: 'mind', mode: 'forest', text: 'What silence teaches you today?', order: 1 },
    { area: 'mind', mode: 'forest', text: 'What thoughts arise in stillness?', order: 2 },
    
    // Relations
    { area: 'relations', mode: 'forest', text: 'How are you connected to all living things?', order: 1 },
    { area: 'relations', mode: 'forest', text: 'What relationship needs tending?', order: 2 },
    
    // Nature
    { area: 'nature', mode: 'forest', text: 'What did the forest show you?', order: 1 },
    { area: 'nature', mode: 'forest', text: 'What natural rhythm do you feel?', order: 2 },
  ];

  for (const q of [...defaultQuestions, ...forestQuestions]) {
    await prisma.question.create({ data: q });
  }

  // Quotes (public domain - Stoic philosophers)
  const quotes = [
    {
      author: 'Marcus Aurelius',
      text: 'You have power over your mind - not outside events. Realize this, and you will find strength.',
      source: 'Meditations',
    },
    {
      author: 'Marcus Aurelius',
      text: 'Waste no more time arguing about what a good man should be. Be one.',
      source: 'Meditations',
    },
    {
      author: 'Seneca',
      text: 'We suffer more often in imagination than in reality.',
      source: 'Letters from a Stoic',
    },
    {
      author: 'Seneca',
      text: 'It is not that we have a short time to live, but that we waste a lot of it.',
      source: 'On the Shortness of Life',
    },
    {
      author: 'Epictetus',
      text: 'It is not what happens to you, but how you react to it that matters.',
      source: 'Enchiridion',
    },
    {
      author: 'Epictetus',
      text: 'First say to yourself what you would be; and then do what you have to do.',
      source: 'Discourses',
    },
    {
      author: 'Marcus Aurelius',
      text: 'The happiness of your life depends upon the quality of your thoughts.',
      source: 'Meditations',
    },
    {
      author: 'Seneca',
      text: 'Luck is what happens when preparation meets opportunity.',
      source: 'Letters from a Stoic',
    },
    {
      author: 'Epictetus',
      text: 'No man is free who is not master of himself.',
      source: 'Discourses',
    },
    {
      author: 'Marcus Aurelius',
      text: 'The best revenge is to be unlike him who performed the injury.',
      source: 'Meditations',
    },
  ];

  for (const quote of quotes) {
    await prisma.quote.create({ data: quote });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });