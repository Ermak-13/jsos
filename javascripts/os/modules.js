var _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events'),
    log = require('./actions/log');

var Modules = function () {
  log('info', 'Start initializing Modules.');

  this.modules = {};

  this.all = function () {
    return this.modules;
  };

  this.get = function (name) {
    return this.all()[name];
  };

  this.add = function (name, module) {
    this.modules[name] = module;
    AppDispatcher.updatedModules(this.modules);
  };

  this.remove = function (name) {
    delete this.modules[name];
    AppDispatcher.updatedModules(this.modules);
  };

  this.getWidget = function (name) {
    if (this.isNotInstalled(name)) {
      return ;
    }

    return this.get(name).Widget;
  };

  this.getShortcut = function (name) {
    if (this.isNotInstalled(name)) {
      return ;
    }

    return this.get(name).Shortcut;
  };

  this.isInstalled = function (name) {
    return !this.isNotInstalled(name);
  };

  this.isNotInstalled = function (name) {
    var Module = this.get(name);

    if (_.isEmpty(Module)) {
      log('error', sprintf('Module %s - is not installed.', name));
      return true;
    }

    return false;
  };

  this.updated = function (callback) {
    AppDispatcher.bind(Events.updatedModules, callback);
  };

  var _this = this;
  AppDispatcher.bind(Events.installModule, function (name, module) {
    _this.add(name, module);
  });

  AppDispatcher.bind(Events.uninstallModule, function (name) {
    _this.remove(name);
  });

  log('info', 'Finish initializing Modules.');
};

module.exports = Modules;
