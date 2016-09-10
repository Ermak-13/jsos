var sprintf = require('underscore.string/sprintf');

var Events = {
  log: 'log',
  updatedLogger: 'updated-logger',
  updatedSettings: 'updated-settings',

  installModule: 'install-module',
  uninstallModule: 'uninstall-module',
  updatedModules: 'updated-modules',

  installScript: 'install-script',
  uninstallScript: 'uninstall-script',
  updatedScripts: 'updated-scripts',

  installStyle: 'install-style',
  uninstallStyle: 'uninstall-style',
  updatedStyles: 'updated-styles',

  addWidget: 'add-widget',
  initWidget: 'init-widget',
  removeWidget: 'remove-widget',
  updatedWidgets: 'updated-widgets',

  openDesktopConfigurator: 'open-desktop-configurator'
};

module.exports = Events;
