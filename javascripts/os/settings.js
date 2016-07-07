var _ = require('underscore');

var DESKTOP_CONFIGURE_BTN_STYLES = {
};

var settings = {
  DEFAULT_WIDGET_STYLES: {
    position: 'absolute',
    width: '300px',
    height: '200px',
    top: '10px',
    left: '70px'
  },

  NAV_ACTIVE_TAB_CLASS_NAME: 'active',
  NAV_INACTIVE_TAB_CLASS_NAME: '',
  NAV_CLASS_NAME: 'nav nav-tabs mini-nav',

  DEFAULT_SETTINGS_DIALOG_NAME: 'default',

  DESKTOP_STORAGE_KEY: 'desktop',
  DESKTOP_WIDGETS_STORAGE_KEY: 'widgets',
  WIDGET_STORAGE_KEY: 'widget-%(id)s',

  DESKTOP_NAME: 'desktop',
  DESKTOP_CONFIGURATOR_REF_NAME: 'configurator',
  DESKTOP_STYLES: {
    background: "url('images/minion-hitman-rain-fog-dark.jpg') no-repeat center fixed",
  },

  DESKTOP_CONFIGURE_BTN_STYLES: {
    right: '10px',
    bottom: '10px'
  }
};

module.exports = settings;
