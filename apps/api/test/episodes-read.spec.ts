const test = require('node:test');
const assert = require('node:assert/strict');
const { PrismaService } = require('../src/prisma/prisma.service');
const { EpisodesService } = require('../src/episodes/episodes.service');

function shouldRunIntegration() {
  return Boolean(process.env.DATABASE_URL);
}

if (!shouldRunIntegration()) {
  test('episodes-read: skipped (no DATABASE_URL)', () => {});
} else {
  test('episodes-read: read APIs regression', async (t) => {
    const prisma = new PrismaService();
    await prisma.$connect();

    const svc = new EpisodesService(prisma, null);

    async function cleanup(prefix) {
      await prisma.episode.deleteMany({ where: { title: { startsWith: prefix } } }).catch(() => {});
    }

    const prefix = `ER-${Date.now()}-`;
    await cleanup(prefix);

    await t.test('list episodes returns expected business fields and hides rss fields', async () => {
      const podcast = await prisma.podcast.create({ data: { title: `${prefix}P`, rssUrl: `https://r/${Date.now()}/ep`, description: 'd' } });
      const e1 = await prisma.episode.create({ data: { podcastId: podcast.id, title: `${prefix}Ep1`, guid: 'g1', audioUrl: 'https://a/1.mp3' } });

      const res = await svc.findAll();
      assert(Array.isArray(res));

      const items = res.filter((i) => i.title && i.title.startsWith(prefix));
      assert(items.length >= 1);

      for (const it of items) {
        // business fields present
        assert.equal(Object.prototype.hasOwnProperty.call(it, 'id'), true);
        assert.equal(Object.prototype.hasOwnProperty.call(it, 'audioUrl'), true);
        // rss operational field absent
        assert.equal(Object.prototype.hasOwnProperty.call(it, 'guid'), false);
      }
    });

    await t.test('get episode by id hides rss fields', async () => {
      const podcast = await prisma.podcast.create({ data: { title: `${prefix}P2`, rssUrl: `https://r/${Date.now()}/ep2` } });
      const e = await prisma.episode.create({ data: { podcastId: podcast.id, title: `${prefix}EpX`, guid: 'gg', audioUrl: 'https://a/x.mp3' } });

      const got = await svc.findById(e.id);
      assert(got.id === e.id);
      assert.equal(Object.prototype.hasOwnProperty.call(got, 'guid'), false);
      assert.equal(Object.prototype.hasOwnProperty.call(got, 'audioUrl'), true);
    });

    await cleanup(prefix);
    await prisma.$disconnect();
  });
}
