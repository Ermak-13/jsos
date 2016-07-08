var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  WIDGET_NAME: 'logger',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_FILTER_LEVEL: 'all',

  DEFAULT_WIDGET_STYLES: _.extend(
    _.clone(globalSettings.DEFAULT_WIDGET_STYLES),
    {
      width: '350px',
      height: '300px'
    }
  )
};

module.exports = settings;
