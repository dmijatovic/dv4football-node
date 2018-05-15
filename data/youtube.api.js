
const axios = require ('axios');

const youtube = require ('./.youtube');

const apiYouTube = {

  searchVideos: (search, order="viewCount")=>{
    let url = youtube.api.search,
      q={
        part:'snippet',
        type:'video',
        key: youtube.key,
        maxResults: 5,
        order: order,
        topicId: youtube.category.channelId,
        q: search
      };
    //console.log( url );
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: youtube.header,
        params: q
      })
      .then((resp)=>{
        //console.log("youtube search...", resp.data);
        let found=[];
        //resolve data
        if (resp.data.items){
          resp.data.items.map((item)=>{
            found.push({
              linkId: item.id.videoId,
              publishedAt: item.snippet.publishedAt,
              channelId: item.snippet.channelId,
              title: item.snippet.title,
              desc: item.snippet.description,
              thumb120x90: item.snippet.thumbnails.default.url,
              thumb320x180: item.snippet.thumbnails.medium.url
            });
          })
        }else{
          console.error("No youtube video items")
        }
        return res(found);
      })
      .catch((e)=>{
        rej(e);
      });
    })
  },

  searchChannel: (search)=>{
    let url = youtube.api.search,
      q={
        part:'snippet',
        type:'channel',
        key: youtube.key,
        maxResults: 5,
        order: "viewCount",
        topicId: youtube.category.channelId,
        q: search
      };
    //console.log( url );
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: youtube.header,
        params: q
      })
      .then((resp)=>{
        //console.log("youtube search...", resp.data);
        let found=[];
        //resolve data
        if (resp.data.items){
          resp.data.items.map((item)=>{
            found.push({
              linkId: item.id.channelId,
              publishedAt: item.snippet.publishedAt,
              channelId: item.snippet.channelId,
              title: item.snippet.title,
              desc: item.snippet.description,
              thumb120x90: item.snippet.thumbnails.default.url,
              thumb320x180: item.snippet.thumbnails.medium.url
            });
          })
        }else{
          console.error("No youtube channel items")
        }
        return res(found);
      })
      .catch((e)=>{
        rej(e);
      });
    })
  }
}


module.exports = apiYouTube;

