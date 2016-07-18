var _ = require('underscore'),

    settings = require('./settings'),
    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events'),
    storage = require('./storage'),

    addScript = require('./actions/script').add;

var Installer = function () {
  this.list = [];

  var _this = this;
  storage.get(settings.SCRIPTS_STORAGE_KEY, function (scripts) {
    _this.list = scripts || [];

    _.each(_this.list, function (obj) {
      addScript(obj);
    });

    AppDispatcher.bind(Events.installScript, function (obj) {
      _this.list.push(obj);

      addScript(obj);
      storage.set(settings.SCRIPTS_STORAGE_KEY, _this.list);
    });
  });

  this.updated = function (callback) {
    AppDispatcher.bind(Events.installScript, callback);
  }

  this.scripts = function () {
    return _this.list;
  };
};

module.exports = new Installer();
