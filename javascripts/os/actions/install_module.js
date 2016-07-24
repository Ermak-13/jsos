var sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('../app_dispatcher'),
    isUrl = require('./is_url'),
    log = require('./log');

var installModule = function () {
  var url = arguments[0],
      name = arguments[0],
      module = arguments[1];

  if (arguments.length === 2 && !_.isEmpty(name) && _.isObject(module)) {
    return _installModule(name, module);
  }

  if (arguments.length === 1 && !_.isEmpty(url) && isUrl(url)) {
    return _installModuleByUrl(url);
  }

  log('error', 'installModules - invalid arguments.');
};

var _installModuleByUrl = function (name, url) {
  console.log(name, url);
};

var _installModule = function (name, module) {
  log('info', sprintf('install module %s.', name));
  AppDispatcher.installModule(name, module);
};

module.exports = installModule;
