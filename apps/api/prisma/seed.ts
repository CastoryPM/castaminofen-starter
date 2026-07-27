import { PrismaClient } from '@prisma/client';
import { bootstrapFeedSources } from '../src/rss/bootstrap/feed-seeder.service';

const prisma = new PrismaClient();

async function main() {
  await bootstrapFeedSources(prisma);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
