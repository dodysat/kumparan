const createClient = require('redis').createClient;
const redis = createClient({
  url: process.env.URL_REDIS || 'redis://localhost:6379'
});

(async () => {
  redis.on('error', (err) => console.log('Redis Client Error', err));
  await redis.connect();
})();

module.exports = {
  redis
}