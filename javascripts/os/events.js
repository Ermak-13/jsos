var sprintf = require('underscore.string/sprintf');

var Events = {
  log: 'log',

  installModule: 'install-module',
  uninstallModule: 'uninstall-module',

  installScript: 'install-script',
  uninstallScript: 'uninstall-script',
  updatedScripts: 'updated-scripts',

  saveDesktop: 'save-desktop',
  initWidget: 'init-widget',
  addWidget: 'add-widget',
  removeWidget: 'remove-widget'
};

module.exports = Events;
