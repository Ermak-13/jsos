var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  DEFAULT_WIDGET_STYLES: _.extend(
    globalSettings.DEFAULT_WIDGET_STYLES,
    {
      width: '60px',
      height: '100%',
      top: '0',
      left: '0',
      borderRadius: '0'
    }
  )
};

module.exports = settings;
