const test = require('node:test');
const assert = require('node:assert/strict');
const { PrismaService } = require('../src/prisma/prisma.service');
const { PodcastsService } = require('../src/podcasts/podcasts.service');

function shouldRunIntegration() {
  return Boolean(process.env.DATABASE_URL);
}

if (!shouldRunIntegration()) {
  test('podcast-read: skipped (no DATABASE_URL)', () => {});
} else {
  test('podcast-read: read APIs regression', async (t) => {
    const prisma = new PrismaService();
    await prisma.$connect();

    const svc = new PodcastsService(prisma);

    // cleanup helper
    async function cleanup(prefix) {
      await prisma.episode.deleteMany({ where: { title: { startsWith: prefix } } }).catch(() => {});
      await prisma.podcast.deleteMany({ where: { title: { startsWith: prefix } } }).catch(() => {});
    }

    const prefix = `PR-${Date.now()}-`;
    await cleanup(prefix);

    await t.test('list podcasts returns expected fields and hides rss fields', async () => {
      const p1 = await prisma.podcast.create({ data: { title: `${prefix}One`, rssUrl: `https://r/${Date.now()}/1`, description: 'd1', website: null, artworkUrl: null } });
      const p2 = await prisma.podcast.create({ data: { title: `${prefix}Two`, rssUrl: `https://r/${Date.now()}/2`, description: 'd2' } });

      const res = await svc.findAll({});
      assert(res && res.data && Array.isArray(res.data));
      const items = res.data.filter((i) => i.title && i.title.startsWith(prefix));
      assert(items.length >= 2);

      // Ensure rssUrl/feedSourceId are not exposed
      for (const it of items) {
        assert.equal(Object.prototype.hasOwnProperty.call(it, 'rssUrl'), false);
        assert.equal(Object.prototype.hasOwnProperty.call(it, 'feedSourceId'), false);
      }
    });

    await t.test('get podcast by id and includes episodes without rss fields', async () => {
      const podcast = await prisma.podcast.create({ data: { title: `${prefix}WithEps`, rssUrl: `https://r/${Date.now()}/3`, description: 'd3' } });
      const e1 = await prisma.episode.create({ data: { podcastId: podcast.id, title: `${prefix}Ep1`, guid: 'g1', audioUrl: 'https://a/1.mp3' } });
      const e2 = await prisma.episode.create({ data: { podcastId: podcast.id, title: `${prefix}Ep2`, guid: 'g2', audioUrl: 'https://a/2.mp3' } });

      const p = await svc.findById(podcast.id);
      assert(p.id === podcast.id);
      assert(Array.isArray(p.episodes));
      assert.equal(p.episodes.length, 2);

      // ensure rss fields not present on podcast
      assert.equal(Object.prototype.hasOwnProperty.call(p, 'rssUrl'), false);
      assert.equal(Object.prototype.hasOwnProperty.call(p, 'feedSourceId'), false);
    });

    await t.test('podcast not found throws NotFoundException', async () => {
      let thrown = false;
      try {
        await svc.findById('non-existent-id');
      } catch (err) {
        thrown = true;
      }
      assert(thrown, 'expected NotFoundException');
    });

    await cleanup(prefix);
    await prisma.$disconnect();
  });
}
