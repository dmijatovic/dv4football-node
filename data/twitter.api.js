
const Twitter = require('twitter-node-client').Twitter;
const config = require('./.twitter');
const twitter = new Twitter(config);

const apiTwitter = {
  search: (search)=>{
    //console.log( url );
    return new Promise((res,rej)=>{
      let query = {'q':'#' + search,'count': 10,'result\_type':'recent'}
      //let query = {'q':'#' + search,'count': 10}
      // Get 10 tweets containing the hashtag haiku
      twitter.getSearch( query,
        (err)=>{
          rej(err);
        },
        (data)=>{
          let tweets=[], raw = JSON.parse(data);
          //console.log("Tweets...", raw.statuses);
          raw.statuses.map((item)=>{
            tweets.push({
              createdAt: item.created_at,
              id: item.id,
              text: item.text,
              userName: item.user.name,
              userLocation: item.user.location,
              followers: item.user.followers_count
            })
          });
          //console.log("Tweets...", tweets);
          res(tweets);
        }
      );
    });
  }
}

module.exports = apiTwitter;

