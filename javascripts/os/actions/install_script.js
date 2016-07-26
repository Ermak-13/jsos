var sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),

    isUrl = require('./is_url'),
    log = require('./log');

var installScript = function (url) {
  if (!isUrl(url)) {
    log('warning', 'installScript - argument is not url.');
  }

  log('info', sprintf('install script %s.', url));
  var script = {
    src: url
  };
  AppDispatcher.installScript(script);
};

module.exports = installScript;
