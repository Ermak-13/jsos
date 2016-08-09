var settings = {
  WIDGET_NAME: 'sticker',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_SIZE: {
    width: '180px',
    height: '180px'
  },
  DEFAULT_POSITION: global.Settings.get('default_position'),

  DEFAULT_WIDGET_STYLES: {
    background: '#F8E71C',
    borderRadius: 0,
    padding: 0,
    transform: 'rotate(0deg)'
  },

  FORM_STYLES: {
    width: '100%',
    height: '100%'
  },

  MESSAGE_FIELD_STYLES: {
    width: '100%',
    height: '100%'
  },

  DEFAULT_TEXTAREA_STYLES: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    width: '100%',
    height: '100%',
    border: 'none',
    resize: 'none',
    fontSize: '14px'
  }
};

module.exports = settings;
