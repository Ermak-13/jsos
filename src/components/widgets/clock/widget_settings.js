var OS = require('os'),
    Events = OS.Events;

var WIDGET_NAME = 'clock';

var settings = {
  WIDGET_NAME: WIDGET_NAME,
  OPEN_SETTINGS_DIALOG_EVENT: Events.openSettingsDialog(WIDGET_NAME),
  SAVE_SETTINGS_EVENT: Events.saveSettings(WIDGET_NAME)
};

module.exports = settings;
