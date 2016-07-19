var sprintf = require('sprintf-js').sprintf,

    Modules = require('../modules'),
    log = require('./log');

var installModule = function (name, module) {
  log('info', sprintf('install module %s.', name));

  Modules.add(name, module);
};

module.exports = installModule;
