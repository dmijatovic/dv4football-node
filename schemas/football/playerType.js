
const {   
  GraphQLObjectType,  
  GraphQLInt,  
  GraphQLString,
  GraphQLList
} = require('graphql');


const tweetsQL = require('./tweets.ql');
const youtubeQL = require("./youtube.ql");

const playerType = new GraphQLObjectType({
  name: "player",
  fields:()=>({    
    name: {type: GraphQLString },
    position: {type: GraphQLString },
    jerseyNumber: {type: GraphQLInt },
    dateOfBirth: {type: GraphQLString },
    nationality: {type: GraphQLString },
    contractUntil: {type: GraphQLString },
    marketValue: {type: GraphQLString },
    tweets: tweetsQL,
    youtube: youtubeQL
  })
})
module.exports = playerType;