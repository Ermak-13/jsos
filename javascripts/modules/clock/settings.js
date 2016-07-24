var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  WIDGET_NAME: 'clock',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_FORMAT: 'HH:mm',
  DEFAULT_UPDATED_INTERVAL: 60 * 1000,

  DEFAULT_SIZE: {
    width: '150px',
    height: '100px'
  },
  DEFAULT_POSITION: globalSettings.DEFAULT_POSITION,

  DEFAULT_TIME_STYLES: {
    height: '80px',
    lineHeight: '80px',
    textAlign: 'center',
    fontSize: '28px'
  }
};

module.exports = settings;
