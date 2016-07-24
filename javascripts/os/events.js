var sprintf = require('underscore.string/sprintf');

var Events = {
  log: 'log',
  saveDesktop: 'save-desktop',

  installModule: 'install-module',
  updatedScripts: 'updated-scripts',

  initWidget: 'init-widget',
  addWidget: 'add-widget',
  removeWidget: 'remove-widget'
};

module.exports = Events;
