
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType
} = require('graphql');

const apiFb =  require('../../data/football.api');

const playerType = require('./playerType');
const tweetsQL = require('./tweets.ql');
const youtubeQL = require("./youtube.ql");

const teamType = new GraphQLObjectType({
  name: "team",
  fields:()=>({
    id: { type: GraphQLInt },
    code: {type: GraphQLString },
    shortName: {type: GraphQLString },
    name: {type: GraphQLString },
    squadMarketValue: {type: GraphQLFloat },
    crestUrl: {type: GraphQLString },
    players:{
      type: new GraphQLList (playerType),
      resolve(parent){
        //console.log("parent...", parent);
        //console.log("args...", args);
        return apiFb.getPlayersByTeam(parent.id);
      }
    },
    tweets: tweetsQL,
    youtube: youtubeQL
  })
})
module.exports = teamType;
