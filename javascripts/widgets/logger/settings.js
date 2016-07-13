var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  WIDGET_NAME: 'logger',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_FILTER_LEVEL: 'all',

  DEFAULT_SIZE: {
      width: '350px',
      height: '300px'
  },
  DEFAULT_POSITION: globalSettings.DEFAULT_POSITION
};

module.exports = settings;
