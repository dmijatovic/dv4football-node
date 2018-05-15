
const {   
  GraphQLObjectType,  
  GraphQLInt,  
} = require('graphql');

const fixtureResult=new GraphQLObjectType({
  name:"fixtureResult",
  fields:()=>({
    goalsHomeTeam: { type: GraphQLInt },
    goalsAwayTeam: { type: GraphQLInt }        
  })
})

module.exports = fixtureResult;