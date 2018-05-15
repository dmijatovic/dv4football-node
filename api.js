/**
 * Require express and graphQL infra
 */
//const functions = require('firebase-functions');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { rootQuery } = require ('./schemas/football.ql');

//firebase config
const firebase = require('./data/.firebase');
//CORS middleware
//const cors = require('cors');
/**
 * Set up express server
 */
const app = express();
//use CORS middleware
//app.use(cors(firebase.cors));
//use custom CORS middleware
app.use(firebase.allowAccess);
/**
 * Root route shows html message and handles posts with graphQL
 */
app.get('/', (req,res)=>{
  res.send(`
    <h1>GraphQL api works!</h1>
    <p>
      If you want to try queries go to <a href="graphiql">GraphiQL</a>
    </p>
  `);
});
app.post('/', graphqlHTTP({
  schema: rootQuery,
  graphiql: false,
}));
/**
 * GraphQL route for graphiql interface and query testing
 */
app.use('/graphiql',
  graphqlHTTP({
    schema: rootQuery,
    graphiql: true,
  })
);
/**
 * Listen to local port
 * Note! this is node-express standalone version
 * not using firebase functions
 */
app.listen(4001,()=>{
  console.log("Api listens on port...4001");
});

