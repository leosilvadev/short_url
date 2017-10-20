const {config, base58} = require('./lib');

const isInvalidUrl = text => {
    if (!text) {
        return true;
    }

    const matched = text.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return matched == null;
}

const buildResolveUrlJson = client => {
    return (req, res) => {
        const {shortUrl} = req.params;

        client.getAsync(`urls.${shortUrl}`)
            .then(url => {
                if (url) {
                    return res.json({url});
                } else {
                    return res.status(404).json({message: 'Invalid link'});
                }
            })
            .catch(err => res.status(500).json({message: err}));
    }
};

const buildResolveUrl = client => {
    return (req, res) => {
        const {shortUrl} = req.params;

        client.getAsync(`urls.${shortUrl}`)
            .then(url => {
                if (url) {
                    res.redirect(301, url);
                } else {
                    res.redirect(301, `${config.apiUrl}/404.html`);
                }
            })
            .catch(err => res.status(500).json({message: err}));
    }
};

const buildShortenUrl = client => {
    return (req, res) => {
        const {url} = req.body;
        if (isInvalidUrl(url)) {
            res.status(400).json({message: 'Invalid url'});
            return;
        }

        client.incrAsync(config.counterKey).then(id => {
            const encodedId = base58.encode(id);
            const shortUrl = `${config.apiUrl}/lk/${encodedId}`;
            return client.setAsync(`urls.${encodedId}`, url).then(response => shortUrl);

        })
        .then(shortUrl => res.status(201).json({url: shortUrl}))
        .catch(err => res.status(500).json({message: err}));
    }
};

module.exports = client => ({
    resolveUrlJson: buildResolveUrlJson(client),
    resolveUrl: buildResolveUrl(client),
    shortenUrl: buildShortenUrl(client)
});
