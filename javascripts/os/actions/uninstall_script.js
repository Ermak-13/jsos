var _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    Scripts = require('../scripts'),
    log = require('./log');

var uninstallScript = function (url) {
  log('info', sprintf('uninstall script %s', url));

  var scripts = Scripts.all(),
      script = _.find(scripts, function (script) {
        return script.src === url;
      });

  Scripts.remove(script);
};

module.exports = uninstallScript;
