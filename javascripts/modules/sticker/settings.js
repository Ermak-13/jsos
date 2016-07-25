var DEFAULT_HEIGHT = '180px';

var settings = {
  WIDGET_NAME: 'sticker',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_SIZE: {
    width: '180px',
    height: DEFAULT_HEIGHT
  },
  DEFAULT_POSITION: global.Settings.get('default_position'),

  DEFAULT_WIDGET_STYLES: {
    background: '#FFF',
    borderRadius: 0
  },

  DEFAULT_TEXTAREA_STYLES: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    width: '100%',
    height: DEFAULT_HEIGHT,
    border: 'none'
  }
};

module.exports = settings;
