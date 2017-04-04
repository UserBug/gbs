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
}

module.exports = checkConfig;
