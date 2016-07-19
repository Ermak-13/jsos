var sprintf = require('sprintf-js').sprintf,

    Scripts = require('../scripts'),
    isUrl = require('./is_url'),
    log = require('./log');

var installScript = function (url) {
  if (!isUrl(url)) {
    log('error', 'installScript - invalid arguments.');
    return;
  }

  log('info', sprintf('install script %s.', url));
  var script = {
    src: url
  };
  Scripts.add(script);
};

module.exports = installScript;
