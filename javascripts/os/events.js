var sprintf = require('underscore.string/sprintf');

var Events = {
  log: 'log',
  updatedLogger: 'updated-logger',

  installModule: 'install-module',
  uninstallModule: 'uninstall-module',
  updatedModules: 'updated-modules',

  installScript: 'install-script',
  uninstallScript: 'uninstall-script',
  updatedScripts: 'updated-scripts',

  addWidget: 'add-widget',
  initWidget: 'init-widget',
  removeWidget: 'remove-widget',
  updatedWidgets: 'updated-widgets',

  saveDesktop: 'save-desktop'
};

module.exports = Events;
