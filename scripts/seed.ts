import { addResponse } from '@/src/services/analytics';

const seeds = [
  {
    userEmail: 'demo+1@example.com',
    language: 'en',
    bodyText: 'Amazing flow overall, but signage leaving the venue could be clearer.',
    nps: 7
  },
  {
    userEmail: 'demo+2@example.com',
    language: 'es',
    bodyText: 'Los guías fueron increíbles y respondieron a todas mis preguntas.',
    nps: 9
  }
];

seeds.forEach(addResponse);

console.log(`Seeded ${seeds.length} responses into the in-memory store`);
