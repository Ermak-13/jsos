var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  WIDGET_NAME: 'webopener',
  CONFIGURATOR_REF_NAME: 'configurator',
  LINK_CREATOR_DIALOG_REF_NAME: 'linkCreatorDialog',

  DEFAULT_WIDGET_STYLES: _.extend(
    _.clone(globalSettings.DEFAULT_WIDGET_STYLES),
    {
      width: '550px',
      height: '360px'
    }
  ),

  DEFAULT_LINK_STYLES: {
    display: 'block',
    width: '120px',
    textAlign: 'center',
    float: 'left',
    padding: '10px',
    margin: '5px'
  },

  DEFAULT_ICON_STYLES: {
    width: '100px',
    fontSize: '100px',
    color: '#333'
  },

  DEFAULT_TEXT_STYLES: {
    color: '#333'
  }
};

module.exports = settings;
