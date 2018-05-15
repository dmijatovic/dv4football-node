
const {   
  GraphQLObjectType,  
  GraphQLInt,  
  GraphQLString
} = require('graphql');


const head2headType = new GraphQLObjectType({
  name:"head2head",
  fields:()=>({
    count: { type: GraphQLInt },
    timeFrameStart: { type: GraphQLString },
    timeFrameEnd: { type: GraphQLString },
    homeTeamWins: { type: GraphQLInt },
    awayTeamWins: { type: GraphQLInt },
    draws: { type: GraphQLInt },
  })
})

module.exports = head2headType;