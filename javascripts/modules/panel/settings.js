var _ = require('underscore');

var settings = {
  WIDGET_NAME: 'panel',
  CONFIGURATOR_REF_NAME: 'configurator',

  LEFT_VERTICAL_PANEL_STYLES: {
    height: '100%',
    top: 0,
    left: 0
  },

  RIGHT_VERTICAL_PANEL_STYLES: {
    height: '100%',
    right: 0,
    top: 0
  },

  TOP_HORIZONTAL_PANEL_STYLES: {
    width: '100%',
    left: 0,
    top: 0
  },

  BOTTOM_HORIZONTAL_PANEL_STYLES: {
    width: '100%',
    left: 0,
    bottom: 0
  },

  VERTICAL_PREV_SHORTCUTS_ARROW_STYLES: {
    position: 'absolute',
    width: '100%',
    top: 0
  },

  VERTICAL_NEXT_SHORTCUTS_ARROW_STYLES: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },

  VERTICAL_SHORTCUTS_CONTAINER_WRAPPER_STYLES: {
    position: 'absolute',
    overflow: 'hidden'
  }
};

module.exports = settings;
