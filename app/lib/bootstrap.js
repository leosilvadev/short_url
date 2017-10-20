const config = require('./config');

module.exports = redisClient => {
    return redisClient.getAsync(config.counterKey).then(value => {
        if (!value) {
            return redisClient.setAsync(config.counterKey, '1000000000');
        }
    });
};
