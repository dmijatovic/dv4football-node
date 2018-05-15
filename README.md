# dv4Football MASTER - GraphQL Node Api

This project uses node, express and GraphQL to expose football data from following open data sources: football.org, wikipedia, twitter and youtube.

## Requirements

For all open data sources used in this demo, except for wikipedia, you need an api key. I will not cover here extensively how to obtain a key. I provide links to sites with more info. Api keys are imported in data/*.api.js scripts at the top of the file. The key is usually passed in the header of request (using axios).

### Get api keys

- footbal.org [key page](https://api.football-data.org/client/register)
- tweeter.com [create new app](https://apps.twitter.com/)
- youtube.com [how to create key](https://developers.google.com/youtube/v3/getting-started)
- wikipedia [main api page](https://www.mediawiki.org/wiki/API:Main_page)

Note! This project wil not work 'out-of-the-box' after cloning because api keys and some other config items are not included in the repo. The files not inlcuded are:

- data/.firebase.js : firebase function specific config
- data/.football.js : football.org api key and config (incl. cache timelimit)
- data/.twitter.js : tweeter.com api key
- data/.youtube.js : youtube.com api key and config

## Caching api requests

Api calls to football.org are cached in the local node module/object. GraphQL queries are structured to fire quite a lot of subsequent api calls. Because data from football.org is quite static (not changing every minute) we save data in memory (I use 10 minutes interval - in miliseconds - in my demo config file).

## Firebase functions

The app is deployed as firebase function using index.js file. For local testing you can use api.js.

## Scripts

This is node app. But it is also firebase function. The folowing scripts are defined in package.json:

- `npm run dev`: will serve stand-alone node-express api point (not using firebase)
- `npm run serve`: will serve it as firebase function locally
- `npm run deploy`: will deploy app to firebase function project. Note you need to have project defined in firebase.

You can also start it as node app with

```bash
  node api.js
```

## GraphQL trainings on youtube

- First example is from [mpj youtube video](https://www.youtube.com/watch?v=lAJWHHUz8_8)

- Second example is from [traversy media video](https://www.youtube.com/watch?v=e9Zxzr7sy60)