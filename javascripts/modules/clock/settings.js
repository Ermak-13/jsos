var settings = {
  DEFAULT_FORMAT: 'HH:mm',
  DEFAULT_UPDATED_INTERVAL: 60 * 1000,

  DEFAULT_SIZE: {
    width: '150px',
    height: '100px'
  },
  DEFAULT_POSITION: global.Settings.get('default_position'),

  DEFAULT_TIME_STYLES: {
    textAlign: 'center',
    fontSize: '28px',
    marginTop: '10px'
  },

  DEFAULT_LOCATION_STYLES: {
    textAlign: 'center',
    fontSize: '16px'
  }
};

module.exports = settings;
