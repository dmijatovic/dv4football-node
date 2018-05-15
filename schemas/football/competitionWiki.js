

const {   
  GraphQLObjectType,    
  GraphQLString
} = require('graphql');

const competitionWiki = new GraphQLObjectType({
  name: "wikipediaCompetitionInfo",
  fields:()=>({    
    title: {type: GraphQLString},
    desc: {type: GraphQLString},
    url:{type: GraphQLString}
  })
})

module.exports = competitionWiki;