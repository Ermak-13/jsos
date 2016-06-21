var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.Settings,
    Events = OS.Events;

var WIDGET_NAME = 'clock';

var settings = {
  WIDGET_NAME: WIDGET_NAME,

  DEFAULT_FORMAT: 'HH:mm',
  DEFAULT_UPDATED_INTERVAL: 60 * 1000,

  DEFAULT_WIDGET_STYLES: _.extend(
    globalSettings.DEFAULT_WIDGET_STYLES,
    {
      width: '150px',
      height: '100px'
    }
  ),

  DEFAULT_TIME_STYLES: {
    height: '80px',
    lineHeight: '80px',
    textAlign: 'center',
    fontSize: '28px'
  },

  OPEN_SETTINGS_DIALOG_EVENT: Events.openSettingsDialog(WIDGET_NAME),
  SAVE_SETTINGS_EVENT: Events.saveSettings(WIDGET_NAME)
};

module.exports = settings;
