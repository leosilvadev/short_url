const express = require('express');

const buildRouter = client => {
    const router = express.Router();
    const controller = require('./controller')(client);

    router.get('/api/v1/:shortUrl.json', controller.resolveUrlJson);
    router.get('/lk/:shortUrl', controller.resolveUrl);
    router.post('/api/v1/shorten', controller.shortenUrl);

    return router;
};

module.exports = client => buildRouter(client);
