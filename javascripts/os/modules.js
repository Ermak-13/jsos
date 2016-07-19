var settings = require('./settings'),
    storage = require('./storage'),
    log = require('./actions/log');

var Modules = function () {
  log('info', 'Start initializing Modules.');

  this.modules = {};
  var _this = this;

  log('info', 'Modules - start loading.');
  storage.get(settings.MODULES_STORAGE_KEY, function (modules) {
    _this.modules = modules || _this.modules;
  });
  log('info', 'Modules - finish loading.');

  this.all = function () {
    return this.modules;
  };

  this.get = function (name) {
    return this.all()[name];
  };

  this.add = function (name, module) {
    this.modules[name] = module;
  };

  this.remove = function (name) {
    delete this.modules[name];
  };

  this.getWidget = function (name) {
    return this.get(name).Widget;
  };

  this.getShortcut = function (name) {
    return this.get(name).Shortcut;
  };

  log('info', 'Finish initializing Modules.');
};

var Singleton = (function () {
  var instance;

  function createInstance () {
    var instance = new Modules();
    return instance;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    }
  };
}) ();

module.exports = Singleton.getInstance();
