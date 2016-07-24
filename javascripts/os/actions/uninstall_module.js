var sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),
    log = require('./log');

var uninstallModule = function (name) {
  log('info', sprintf('uninstall module %s.', name));
  AppDispatcher.uninstallModule(name);
};

module.exports = uninstallModule;
