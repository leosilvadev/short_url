const {bootstrap, config} = require('./lib');
const redis = require("redis");
const redisClient = redis.createClient(config.redisUrl);
const bluebird = require('bluebird');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router')(redisClient);

bluebird.promisifyAll(redis.RedisClient.prototype);

bootstrap(redisClient).then(result => {
    app.use(express.static('public'))
    app.use(bodyParser.json());
    app.use(router);

    app.listen(config.appPort, () => {
      console.log(`ShortUrl api listening on port ${config.appPort}`);
    });
});
