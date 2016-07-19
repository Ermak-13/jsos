var sprintf = require('sprintf-js').sprintf,

    Installer = require('../installer'),
    log = require('./log');

var installScript = function (url) {
  log('info', sprintf('install script %s', url));

  var script = {
    src: url
  };
  Installer.add(script);
};

module.exports = installScript;
