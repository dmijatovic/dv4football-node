/**
 * Require express and graphQL infra
 */
const functions = require('firebase-functions');
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
//used custom CORS middleware
app.use(firebase.allowAccess);

/**
 * Root route shows html message and handles posts with graphQL
 */
app.get('/', firebase.allowAccess, (req,res)=>{
  res.send(`
    <h1>GraphQL api works!</h1>
    <p>
      If you want to try queries go to <a href="graphiql">GraphiQL</a>
    </p>
  `);
});
app.post('/', firebase.allowAccess, graphqlHTTP({
  schema: rootQuery,
  graphiql: false,
}));

/**
 * GraphQL route for graphiql interface and query testing
 */
app.use('/graphiql', firebase.allowAccess,
  graphqlHTTP({
    schema: rootQuery,
    graphiql: true,
  })
);

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
