
const {   
  GraphQLObjectType,  
  GraphQLInt,  
  GraphQLString,
  GraphQLList
} = require('graphql');

const standingType = require('./standingType');

const leagueTableType = new GraphQLObjectType({
  name:"leagueTable",
  fields:()=>({
    league: { type: GraphQLString },
    matchday: { type: GraphQLInt },
    standing: {
      type: new GraphQLList(standingType)      
    }
  })
});

module.exports = leagueTableType;