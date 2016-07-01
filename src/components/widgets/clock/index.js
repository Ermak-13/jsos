var Widget = require('./widget'),
    SettingsDialog = require('./configurator');

var Clock = {
  Widget: Widget,
  SettingsDialog: SettingsDialog
};

module.exports = Clock;
window.Clock = Clock;
