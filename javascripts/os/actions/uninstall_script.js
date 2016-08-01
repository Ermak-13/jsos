var sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),
    log = require('./log');

var uninstallScript = function (script) {
  log('info', sprintf('uninstallScript %s.', JSON.stringify(script)));
  AppDispatcher.uninstallScript(script);
};

module.exports = uninstallScript;
