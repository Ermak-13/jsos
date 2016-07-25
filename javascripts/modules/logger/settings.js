var settings = {
  WIDGET_NAME: 'logger',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_FILTER_LEVEL: 'all',

  DEFAULT_SIZE: {
      width: '350px',
      height: '300px'
  },
  DEFAULT_POSITION: global.Settings.get('default_position')
};

module.exports = settings;
