var _ = require('underscore'),

    settings = require('./settings'),
    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events'),
    storage = require('./storage'),

    log = require('./actions/log'),
    addScript = require('./actions/script').add;

var Installer = function () {
  log('info', 'Start initializing Installer.');

  this.list = [];
  var _this = this;

  log('info', 'Installer - start loading scripts.');
  storage.get(settings.SCRIPTS_STORAGE_KEY, function (scripts) {
    _this.list = scripts || [];

    _.each(_this.list, function (script) {
      addScript(script);
    });
    AppDispatcher.updatedInstaller(_this.list);

    AppDispatcher.bind(Events.installScript, function (script) {
      _this.add(script);
    });
  });
  log('info', 'Installer - finish loading scripts.');

  this.add = function (script) {
    _this.list.push(script);

    storage.set(settings.SCRIPTS_STORAGE_KEY, _this.list, function () {
      addScript(script);
      AppDispatcher.updatedInstaller(_this.list);
    });
  };

  this.remove = function (script) {
    _this.list = _.without(_this.list, script);

    storage.set(settings.SCRIPTS_STORAGE_KEY, _this.list, function () {
      AppDispatcher.updatedInstaller(_this.list);
    });
  };

  this.scripts = function () {
    return _this.list;
  };

  this.updated = function (callback) {
    AppDispatcher.bind(Events.updatedInstaller, callback);
  };

  log('info', 'Finish initializing Installer.');
};

module.exports = new Installer();
