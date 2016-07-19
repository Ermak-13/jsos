var _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    Installer = require('../installer'),
    log = require('./log');

var uninstallScript = function (url) {
  log('info', sprintf('uninstall script %s', url));

  var scripts = Installer.scripts(),
      script = _.find(scripts, function (script) {
        return script.src === url;
      });

  Installer.remove(script);
};

module.exports = uninstallScript;
