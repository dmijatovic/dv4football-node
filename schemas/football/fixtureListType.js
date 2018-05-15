const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString
} = require('graphql');

const fixtureType = require('./fixtureType');

const fixtureListType = new GraphQLObjectType({
  name:"fixtureList",
  fields:()=>({
    timeFrameStart: { type: GraphQLString },
    timeFrameEnd: { type: GraphQLString },
    count: { type: GraphQLInt },
    fixtures: {
      type: new GraphQLList (fixtureType),
      resolve(parent){
        //console.log("extract parent", parent);
        let games=[];
        parent.fixtures.map((item)=>{
          //console.log("fixtures...", item);
          let url,fid,cid,hid,aid;
          //we need to extract id from links object!
          url = item._links.self.href.split("/");
          fid = url[url.length-1];
          if (item._links.competition){
            url = item._links.competition.href.split("/");
            cid = url[url.length-1];
          }
          if (item._links.homeTeam){
            url = item._links.homeTeam.href.split("/");
            hid = url[url.length-1];
          }
          if (item._links.awayTeam){
            url = item._links.awayTeam.href.split("/");
            aid = url[url.length-1];
          }
          //update this info
          item['fixtureId'] = fid;
          item['competitionId'] = cid;
          item['homeTeamId'] = hid;
          item['awayTeamId'] = aid;
          //add item
          games.push(item);
        });
        return games;
      }
    }
  })
})

module.exports = fixtureListType;
