

const {   
  GraphQLObjectType,  
  GraphQLInt,  
  GraphQLString
} = require('graphql');

const teamStat = new GraphQLObjectType({
  name:'teamStat',
  fields:()=>({
    goals: { type: GraphQLInt },    
    goalsAgainst: { type: GraphQLInt },    
    wins: { type: GraphQLInt },    
    draws: { type: GraphQLInt },    
    losses: { type: GraphQLInt }
  })
})

module.exports = teamStat;