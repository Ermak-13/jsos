var _ = require('underscore'),
    defaultSettings = require('./default_settings');

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
    this.settings[key] = value;
  };
};

module.exports = Settings;
