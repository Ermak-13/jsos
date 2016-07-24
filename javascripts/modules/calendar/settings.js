var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  WIDGET_NAME: 'calendar',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_UPDATED_INTERVAL: 60 * 1000,

  DEFAULT_SIZE: {
    width: '150px',
    height: '100px'
  },
  DEFAULT_POSITION: globalSettings.DEFAULT_POSITION,

  DEFAULT_CALENDAR_STYLES: {
    width: '100%',
    textAlign: 'center',
    margin: 'auto'
  },

  DEFAULT_MONTH_STYLES: {
    fontSize: '24px',
    lineHeight: '24px',
    fontWeight: 'bold',
    marginTop: '5px'
  },

  DEFAULT_DAY_STYLES: {
    fontSize: '36px',
    lineHeight: '36px'
  }
};

module.exports = settings;
