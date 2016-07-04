var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings;

var DEFAULT_SHORTCUT_STYLES = {
  width: '100%',
  display: 'inline-block',
  textAlign: 'center',
  lineHeight: '48px',
  fontSize: '48px',
  color: '#333',
  marginTop: '10px'
};

var settings = {
  DEFAULT_WIDGET_STYLES: _.extend(
    globalSettings.DEFAULT_WIDGET_STYLES,
    {
      width: '60px',
      height: '100%',
      top: 0,
      left: 0,
      borderRadius: 0
    }
  ),

  DEFAULT_SHORTCUT_STYLES: DEFAULT_SHORTCUT_STYLES,
  DEFAULT_HOVER_SHORTCUT_STYLES: _.extend(
    _.clone(DEFAULT_SHORTCUT_STYLES),
    {
      lineHeight: '52px',
      fontSize: '52px',
      color: '#111'
    }
  )
};

module.exports = settings;
