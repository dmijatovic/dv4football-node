
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

//api scripts
const apiFb = require('../../data/football.api');
const apiWiki = require('../../data/wikipedia.api');

const fixtureListType = require('./fixtureListType');
const competitionWiki = require('./competitionWiki');
const teamType = require('./teamType');
const leagueTableType = require('./leagueTableType');

const competitionType = new GraphQLObjectType({
  name: "competition",
  description:"Competition info from football.org incl. wiki info and teams object. nextRound includes all games planned for 7 days in the future from today.",
  fields:()=>({
    id: { type: GraphQLInt },
    caption: { type: GraphQLString },
    league: { type: GraphQLString },
    year: { type: GraphQLString },
    currentMatchday: { type: GraphQLInt },
    numberOfMatchdays: { type: GraphQLInt },
    numberOfTeams: { type: GraphQLInt },
    numberOfGames: { type: GraphQLInt },
    lastUpdated: { type: GraphQLString },
    name: {
      type: GraphQLString,
      resolve(parent){
        let pos = parent.caption.indexOf(parent.year)
          //remove year from bane
          n = parent.caption.slice(0, pos-1);
        return n;
      }
    },
    wiki:{
      type: competitionWiki,
      resolve(parent){
        //find year in caption
        let pos = parent.caption.indexOf(parent.year)
          //remove year from bane
          name = parent.caption.slice(0, pos-1);
        //console.log("Year in caption at...", pos);
        //console.log("Name...", name);
        //return name;
        return apiWiki.openSearch(name);
      }
    },
    teams: {
      type: new GraphQLList (teamType),
      resolve(parent){
        //console.log("parent...", parent, args);
        //console.log("args...", args);
        return apiFb.getTeams(parent.id);
      }
    },
    nextRound:{
      type: fixtureListType,
      resolve(parent,args){
        return apiFb.getFixturesByPeriod(
          null, parent.league
        );
      }
    },
    leagueTable:{
      type: leagueTableType,
      resolve(parent, args){
        return apiFb.getLeagueTable(parent.id);
      },
      description:"Current standings for selected competition."
    }
  })
});

module.exports = competitionType;
