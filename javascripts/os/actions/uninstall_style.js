var sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),
    log = require('./log');

var uninstallStyle = function (style) {
  log('info', sprintf('uninstallStyle %s.', JSON.stringify(style)));
  AppDispatcher.uninstallStyle(style);
};

module.exports = uninstallStyle;
