/**
 * Validate config object
 * @param {{}} defaultConfig
 * @param {{}} [config]
 * @returns {Array}
 */
function checkConfig(defaultConfig, config) {
  config = config || {};
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

  const unknownConfigs = [];
  for (const configName in config) {
    if (!defaultConfig.hasOwnProperty(configName)) {
      unknownConfigs.push(configName);
    }
  }
  if (unknownConfigs.length) {
    addError('You are trying to set unknown configs -> "' + unknownConfigs.join('", "') + '"');
  }


  for (const key in defaultConfig) {
    if (
      key !== 'uglifyBundles' &&
      typeof config[key] !== 'undefined' &&
      typeof config[key] !== typeof defaultConfig[key]
    ) {
      addError(
        'Wrong type of config "' + key + '", ' +
        'expect "' + (typeof defaultConfig[key]) + '" got "' + (typeof config[key]) + '"'
      );
    }
  }

  return configValidationErrors;
}

module.exports = checkConfig;
