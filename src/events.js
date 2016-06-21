var sprintf = require('underscore.string/sprintf');

var Events = {
  openSettingsDialog: function (name) {
    return sprintf('open-%s-settings-dialog', name);
  },

  saveSettings: function (name) {
    return sprintf('save-%s-settings', name);
  }
};

module.exports = Events;
