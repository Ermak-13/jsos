var sprintf = require('underscore.string/sprintf');

var Events = {
  openSettingsDialog: function (name) {
    return sprintf('open-%s-settings-dialog');
  }
};

module.exports = Events;
