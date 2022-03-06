const { mongoDB } = require('../modules/mongoDB');
const { redis } = require('../modules/redis');

const redisDataInitialization = async () => {
  const articles = await mongoDB.db('kumparan').collection('articles').find({}).toArray();
  await Promise.all(articles.map(async (article) => {
    article.id = article._id;
    delete article._id;
    await redis.set(`article:${article.id}`, JSON.stringify(article));
  }));
}

module.exports = redisDataInitialization;