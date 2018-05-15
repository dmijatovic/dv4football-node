
const {   
  GraphQLObjectType,  
  GraphQLInt,  
  GraphQLString
} = require('graphql');

const teamStat = require('./teamStat');

const standingType = new GraphQLObjectType({
  name:"standing",
  fields:()=>({
    position:{ type: GraphQLInt },    
    teamId: { type: GraphQLInt },
    teamName: { type: GraphQLString },    
    playedGames: { type: GraphQLInt },
    crestURI: { type: GraphQLString },
    points: { type: GraphQLInt },
    goals: { type: GraphQLInt },
    goalsAgainst: { type: GraphQLInt },
    goalDifference: { type: GraphQLInt }, 
    wins: { type: GraphQLInt },   
    draws: { type: GraphQLInt }, 
    losses: { type: GraphQLInt },
    home: {type: teamStat},
    away: {type: teamStat}
  })
});

module.exports = standingType;