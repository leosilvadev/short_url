# How is it working?
Using redis to generate incremental Identifiers in a atomic way.
Using redis to persist all the shortened urls.

# Build it
```
docker build -t urlshortener:v1 .
```

# Run it
```
docker run -e REDIS_URL=redis://HOST:PORT -p 3000:3000 urlshortener:v1
```

# Use it
Go to http://localhost:3000 and try it out!

# Endpoints

POST /api/v1/shorten
You register your new url, and receives a short url in response body as well.

```{"url": "http://myurl"}```


GET /api/v1/MYSHORTURL.json
You receive your url as json.

```{"url": "http://myurl"}```


GET /lk/MYSHORTURL
You are redirected to the url, in case it exists
