const {   
  GraphQLObjectType,
  GraphQLList, 
  GraphQLInt,
  GraphQLFloat,
  GraphQLString  
} = require('graphql');

const apiFb = require('../../data/football.api');
const fixtureResult = require('./fixtureResult'); 
const head2headType = require('./head2headType'); 

const fixtureType = new GraphQLObjectType({
  name:"fixture",
  fields:()=>({
    fixtureId: { type: GraphQLInt },
    competitionId: { type: GraphQLInt },        
    date: { type: GraphQLString },
    status: { type: GraphQLString },
    matchday: { type: GraphQLInt },        
    homeTeamId: { type: GraphQLInt },
    homeTeamName: { type: GraphQLString },
    awayTeamId: { type: GraphQLInt },
    awayTeamName: { type: GraphQLString },
    result: { type: fixtureResult },
    head2head: {
      type: head2headType,
      args:{
        count:{type: GraphQLInt}  
      },
      resolve(parent, args){
        return apiFb.getHead2Head(
          parent.fixtureId, args.count 
        )
      }
    }
  })
});

module.exports = fixtureType;