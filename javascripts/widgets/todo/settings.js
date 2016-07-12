var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  WIDGET_NAME: 'todo',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_WIDGET_STYLES: _.extend(
    _.clone(globalSettings.DEFAULT_WIDGET_STYLES),
    {
      width: '450px',
      height: '300px'
    }
  )
};

module.exports = settings;
