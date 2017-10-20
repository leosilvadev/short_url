module.exports = {
    appPort: process.env.APP_PORT || 3000,
    redisUrl: process.env.REDIS_URL,
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    counterKey: 'urls.counter'
};
