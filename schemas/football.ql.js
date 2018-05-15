
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString
} = require('graphql');

//api scripts
const apiFb = require('../data/football.api');
const apiWiki = require('../data/wikipedia.api');
const apiTwitter = require('../data/twitter.api');
const apiYoutube = require('../data/youtube.api');

//GraphQL defs
const competitionType = require('./football/competitionType');
const teamType = require('./football/teamType');
const playerType = require('./football/playerType');
const leagueTableType = require('./football/leagueTableType');
const fixtureListType = require('./football/fixtureListType');

const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: "Query football info from number of open api sources: football.org, wikipedia, twitter and youtube.",
  fields:{
    competitions:{
      type: new GraphQLList(competitionType),
      args:{
        season: {
          type: GraphQLInt,
          description:"Provide 4 digit value of the year when the season started. Value 2017 represents 2017/18 football season."
        },
        select: {
          type: GraphQLList (GraphQLInt),
          description:"Provide a list of integer values that represent competition id's. Default value is empty array which will return all competitions."
        }
      },
      resolve(parent, args){
        return apiFb.getCompetions(args.season, args.select);
      },
      description: "Require all competitions from football.org by season. Defaul season is current season"
    },
    competition: {
      type: competitionType,
      args:{
        id: { type: GraphQLInt }
      },
      resolve(parent, args){
        return apiFb.getCompetion(args.id);
      },
      description: "Require competition by id. Competition id is provided by competitions query."
    },
    teams:{
      type: new GraphQLList(teamType),
      args:{
        id: {type: GraphQLInt}
      },
      resolve(parent,args){
        return apiFb.getTeams(args.id);
      },
      description:"Require all teams from specific competition by id. Competition id is provided by compeitions query"
    },
    team:{
      type: teamType,
      args:{
        tid: {type: GraphQLInt}
      },
      resolve(parent,args){
        return apiFb.getTeam(args.tid);
      },
      description:"Require team info by team id. Team id is provided by teams query."
    },
    players:{
      type:  new GraphQLList(playerType),
      args:{
        tid: {type: GraphQLInt}
      },
      resolve(parent,args){
        return apiFb.getPlayersByTeam2(args.tid);
      },
      description:"Require players by team id. Team id is provided by teams object."
    },
    leagueTable:{
      type: leagueTableType,
      args:{
        id: {type: GraphQLInt}
      },
      resolve(parent, args){
        return apiFb.getLeagueTable(args.id);
      },
      description:"Current standings for selected competition. Competition id is provided by compeitions query. "
    },
    fixturesByPeriod:{
      type: fixtureListType,
      args:{
        nday:{type: GraphQLString},
        league:{type: GraphQLString}
      },
      resolve(parent,args){
        return apiFb.getFixturesByPeriod(
          args.nday,args.league
        );
      },
      description:"Get all games within specific timeframe. Default values are 7 days upfront. League value is provided in compeitions.league. Legaue is optional."
    },
    fixturesByTeam:{
      type: fixtureListType,
      args:{
        //teamId
        tid: {type: GraphQLInt},
        season:{type: GraphQLInt},
        nday:{type: GraphQLString},
        venue:{type: GraphQLString}
      },
      resolve(parent,args){
        return apiFb.getFixturesByTeam(
          args.tid, args.season,
          args.nday,args.venue
        );
      },
      description:"Provide all games for specific team, defined by team id, for specific season, for defined number of days from today (n7 | p7)"
    }
  }
})

module.exports = {
  rootQuery: new GraphQLSchema({
    query: rootQuery
  })
}


