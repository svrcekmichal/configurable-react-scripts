var path = require('path');
var chalk = require('chalk');
var fs = require('fs')

exports.schemaPath = path.resolve(__dirname, '../graphql-schema.json');

exports.getBabelRelayPlugin = function(){
  if(!fs.existsSync(exports.schemaPath)) {
    console.log(chalk.red('GraphQL schema not found - have you run "npm run setupRelay"?'))
    process.exit("GraphQL schema not found");
  }

  var schema = require(exports.schemaPath);
  var getBabelRelayPlugin = require('babel-relay-plugin');
  return getBabelRelayPlugin(schema.data);
}

