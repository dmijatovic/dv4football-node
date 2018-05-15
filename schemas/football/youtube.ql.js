
const {     
  GraphQLObjectType,  
  GraphQLInt,  
  GraphQLString,
  GraphQLEnumType,
  GraphQLList  
} = require('graphql');

const apiYoutube = require('../../data/youtube.api');

const youtubeType =  new GraphQLObjectType({
  name: "youtube",
  fields:()=>({    
    linkId: {type: GraphQLString}, 
    publishedAt: {type: GraphQLString},
    channelId: {type: GraphQLString},
    channelTitle: {type: GraphQLString},
    title: {type: GraphQLString},
    desc: {type: GraphQLString},
    thumb120x90: {type: GraphQLString},
    thumb320x180: {type: GraphQLString},
  })
});

const youtubeOrderType = new GraphQLEnumType({
  name:"YoutubeSearchOrder",
  values:{
    mostRecent5: {
      description:"show 5 most recent youtube videos about subject",
      value: "date"
    },
    mostViewed5: {
      description:"show 5 most viewed youtube videos about subject",
      value: "viewCount"
    }
  }
});

const youtubeQL = {
  type: new GraphQLList (youtubeType),   
  args:{
    order:{ type: youtubeOrderType }
  },   
  resolve(parent, args){
    //console.log("youtube...args...", args);        
    return apiYoutube.searchVideos(parent.name, args.order);
  }
}
module.exports = youtubeQL;
