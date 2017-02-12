var relayLib = require('./libs/relay');
var fs = require('fs');

module.exports = function(webpackConfig, isDevelopment) {

  /**
   * Relay setup
   */

  const babelRule = findRule(webpackConfig, function(rule){ return rule.loader === 'babel-loader' });
  babelRule.options.plugins = babelRule.options.plugins || [];
  babelRule.options.plugins.push(relayLib.getBabelRelayPlugin());
  babelRule.options.cacheDirectory = true;
  babelRule.options.cacheIdentifier = fs.statSync(relayLib.schemaPath).mtime;

  return webpackConfig;
}

function findRule(config, callback) {
  var index = config.module.rules.findIndex(callback);
  if(index === -1) throw Error('Rule now found');
  return config.module.rules[index];
}