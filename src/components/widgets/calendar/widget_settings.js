var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  WIDGET_NAME: 'calendar',
  SETTINGS_DIALOG_NAME: 'calendar',

  DEFAULT_UPDATED_INTERVAL: 60 * 1000,

  DEFAULT_WIDGET_STYLES: _.extend(
    _.clone(globalSettings.DEFAULT_WIDGET_STYLES),
    {
      width: '150px',
      height: '100px'
    }
  ),

  DEFAULT_CALENDAR_STYLES: {
    width: '100px',
    textAlign: 'center',
    margin: 'auto'
  },

  DEFAULT_MONTH_STYLES: {
    background: '#EE0',
    fontWeight: 'bold',
    border: 'solid 1px',
    borderBottom: 'none'
  },

  DEFAULT_DAY_STYLES: {
    fontSize: '32px',
    border: 'solid 1px'
  }
};

module.exports = settings;
