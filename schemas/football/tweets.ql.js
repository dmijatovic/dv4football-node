
const {   
  GraphQLObjectType,  
  GraphQLInt,  
  GraphQLString,
  GraphQLList  
} = require('graphql');

const apiTwitter = require('../../data/twitter.api');

const tweetType = new GraphQLObjectType({
  name: "tweet",
  fields:()=>({    
    createdAt: {type: GraphQLString},
    id: {type: GraphQLString},
    text:{type: GraphQLString},
    userName:{type: GraphQLString},
    userLocation: {type: GraphQLString},
    followers: {type: GraphQLInt}  
  })
})

const tweetsQL={
  type: new GraphQLList (tweetType),      
  resolve(parent){        
    return apiTwitter.search(parent.name);
  }
}

module.exports = tweetsQL;