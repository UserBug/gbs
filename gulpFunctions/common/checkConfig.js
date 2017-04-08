const _ = require('lodash');

/**
 * Validate config object
 * @param {{}} defaultConfig
 * @param {{}} config
 * @returns {Array}
 */
function checkConfig(defaultConfig, config) {
  const configValidationErrors = [];

  function addError(message) {
    configValidationErrors.push(message);
    return configValidationErrors;
  }

  if (config) {
    if (typeof config !== 'object') {
      return addError('Config must be "object"');
    }
  }

  const unknownConfigs = _.xor(Object.keys(defaultConfig), Object.keys(config));
  if (unknownConfigs.length) {
    addError('Find unknown configs -> "' + unknownConfigs.join('", "') + '"');
  }

  for (const key in defaultConfig) {
    if (typeof config[key] !== 'undefined' && typeof config[key] !== typeof defaultConfig[key]) {
      addError(
        'Wrong type of config "' + key + '", ' +
        'expect "' + (typeof defaultConfig[key]) + '" got "' + (typeof config[key]) + '"'
      );
    }
  }

  return configValidationErrors;
}

module.exports = checkConfig;
