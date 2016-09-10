var _ = require('underscore'),
    defaultSettings = require('./default_settings'),
    AppDispatcher = require('./app_dispatcher');

var Settings = function (settings) {
  this.settings = _.extend(
    _.clone(defaultSettings),
    settings
  );

  this.get = function (key) {
    key = key.toUpperCase();
    return _.clone(this.settings[key]);
  };

  this.set = function (key, value) {
    key = key.toUpperCase();
    this.settings[key] = value;

    AppDispatcher.updatedSettings(this.settings);
  };
};

module.exports = Settings;
