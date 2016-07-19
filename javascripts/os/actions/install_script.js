var sprintf = require('sprintf-js').sprintf,
    AppDispatcher = require('../app_dispatcher'),

    log = require('./log');

var installScript = function (url) {
  log('info', sprintf('install script %s', url));

  var obj = {
    src: url
  };

  AppDispatcher.installScript(obj);
};

module.exports = installScript;
