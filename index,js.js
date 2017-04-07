const defaultConfig = require('./defaultConfig');
const checkConfig = require('./gulp/common/checkConfig');

/**
 * Gulp Build System
 * @param {{}} config
 * @constructor
 */
function GBS(config) {
  const configValidationErrors = checkConfig(defaultConfig, config);
  if (configValidationErrors.length) {
    throw new Error('GBS config errors: \n' + configValidationErrors.join('\n'));
  }
  this.config = config;



}

module.exports = GBS;
