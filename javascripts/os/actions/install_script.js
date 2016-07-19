var sprintf = require('sprintf-js').sprintf,

    Scripts = require('../scripts'),
    log = require('./log');

var installScript = function (url) {
  log('info', sprintf('install script %s', url));

  var script = {
    src: url
  };
  Scripts.add(script);
};

module.exports = installScript;
