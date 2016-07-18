var OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  WIDGET_NAME: 'installer',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_SIZE: {
    width: '420px',
    height: '300px'
  },
  DEFAULT_POSITION: globalSettings.DEFAULT_POSITION
};

module.exports = settings;
