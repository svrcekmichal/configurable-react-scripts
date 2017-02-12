const chalk = require('chalk');
const fetch = require('node-fetch');
const graphQlutilities = require('graphql/utilities');
const fs = require('fs');
require('dotenv').config({silent: true});

const relay = require('./relay');

const requireGraphQlConfig = function() {
  return new Promise((resolve, reject) => {
    if (!process.env.GRAPHQL_ENDPOINT) {
      reject(new Error(
        chalk.red('Relay requires a url to your graphql server\n') +
        'Specifiy this in a ' + chalk.cyan('GRAPHQL_ENDPOINT') + ' environment variable.'
      ));
    } else {
      console.log(chalk.green("Relay support - GRAPHQL_ENDPOINT configured successfully"));
      resolve();
    }
  });
}

const loadSchema = function() {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(relay.schemaPath)) {
      reject(new Error(
        chalk.yellow('Relay support - babel-relay-plugin didn\'t find graphql-schema.json\n')
      ));
    } else {
      console.log(chalk.green("Relay support - graphql-schema.json find"));
      resolve()
    }
  })
}

var validateSchemaJson = function () {
  return new Promise((resolve, reject) => {
    var schemaFileContents = fs.readFileSync(relay.schemaPath);
    // check that schema.json is valid json
    var schemaJSON;
    try {
      schemaJSON = JSON.parse(schemaFileContents);
    } catch (err) {
      return reject(new Error(
        chalk.red('JSON parsing of the contents of graphql-schema.json failed.\n') +
        'Check the contents of ' + relay.schemaPath + '. It does not appear to be valid json\n'
      ));
    }

    try {
      graphQlutilities.buildClientSchema(schemaJSON.data);
    } catch (err) {
      reject(new Error(
        chalk.red('Could not parse the contents of schema.json into a valid graphql schema that is compatiable with this version of Relay and babel-relay-plugin\n') +
        'Upgrading graphql library on your server may be a solution.'
      ));
    }

    console.log('Relay support - schema is valid');
    resolve();
  });
}

// retreive JSON of graaphql schema via introspection for Babel Relay Plugin to use
var fetchRelaySchema = function () {
  console.log('Relay support - fetching schema from ' + chalk.cyan(process.env.GRAPHQL_ENDPOINT));
  return fetch(process.env.GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'query': graphQlutilities.introspectionQuery}),
  })
    .then(res => res.json()).then(schemaJSON => {
      // verify that the schemaJSON is valid a graphQL Schema
      var graphQLSchema = graphQlutilities.buildClientSchema(schemaJSON.data);
      // Save relay compatible schema.json
      fs.writeFileSync(relay.schemaPath, JSON.stringify(schemaJSON, null, 2));

      // Save user readable schema.graphql
      fs.writeFileSync(relay.schemaPath.replace('.json', '.graphql'), graphQlutilities.printSchema(graphQLSchema));
      console.log(chalk.green('Relay support - GraphQL schema successfully fetched'));
    });
}

requireGraphQlConfig()
  .then(loadSchema)
  .catch(fetchRelaySchema)
  .then(validateSchemaJson)
  .then(() => {
    console.log(chalk.green('Relay support everything configured successfully!'));
  }, function(e){
    console.log(e.message);
    process.exit("Seomthing went wrong :D");
  });