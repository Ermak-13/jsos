var OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  WIDGET_NAME: 'sticker',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_SIZE: {
    width: '180px',
    height: '180px'
  },

  DEFAULT_POSITION: globalSettings.DEFAULT_POSITION
};

module.exports = settings;
