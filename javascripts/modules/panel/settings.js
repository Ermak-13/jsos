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
    width: '100%',
    top: 0
  },

  HORIZONTAL_PREV_SHORTCUTS_ARROW_STYLES: {
    height: '100%',
    left: 0
  },

  VERTICAL_NEXT_SHORTCUTS_ARROW_STYLES: {
    width: '100%',
    bottom: 0
  },

  HORIZONTAL_NEXT_SHORTCUTS_ARROW_STYLES: {
    height: '100%',
    right: 0
  },

  VERTICAL_SHORTCUTS_CONTAINER_STYLES: {
    marginLeft: 0
  },

  HORIZONTAL_SHORTCUTS_CONTAINER_STYLES: {
    marginTop: 0
  },

  PREV_SHORTCUTS_ARROW_ANIMATE_PROPS: {
    'left-vertical': { 'margin-top': '-=90' },
    'right-vertical': { 'margin-top': '-=90'},
    'top-horizontal': { 'margin-left': '-=90' },
    'bottom-horizontal': { 'margin-left': '-=90' }
  },

  NEXT_SHORTCUTS_ARROW_ANIMATE_PROPS: {
    'left-vertical': { 'margin-top': '+=90' },
    'right-vertical': { 'margin-top': '+=90' },
    'top-horizontal': { 'margin-left': '+=90' },
    'bottom-horizontal': { 'margin-left': '+=90' }
  },

  SHORTCUTS_ARROW_ANIMATE_DURATION: 1000
};

module.exports = settings;
