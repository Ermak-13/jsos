var MicroEvent = require('microevent'),
    Events = require('./events'),
    settings = require('./settings'),
    DEFAULT_SETTINGS_DIALOG_NAME = settings.DEFAULT_SETTINGS_DIALOG_NAME;

var AppDispatcher = function () {
  var _this = this;

  this.log = function (level, message) {
    _this.trigger(Events.log, level, message);
  };

  this.updatedLogger = function (logs) {
    _this.trigger(Events.updatedLogger, logs);
  };

  this.openDesktopConfigurator = function () {
    _this.trigger(Events.openDesktopConfigurator);
  };

  this.installModule = function (name, module) {
    _this.trigger(Events.installModule, name, module);
  };

  this.uninstallModule = function (name) {
    _this.trigger(Events.uninstallModule, name);
  };

  this.updatedModules = function (modules) {
    _this.trigger(Events.updatedModules, modules);
  };

  this.installScript = function (script) {
    _this.trigger(Events.installScript, script);
  };

  this.uninstallScript = function (script) {
    _this.trigger(Events.uninstallScript, script);
  };

  this.updatedScripts = function (scripts) {
    _this.trigger(Events.updatedScripts, scripts);
  };

  this.initWidget = function (widget) {
    _this.trigger(Events.initWidget, widget);
  };

  this.addWidget = function (name) {
    _this.trigger(Events.addWidget, name);
  };

  this.removeWidget = function (widgetId) {
    _this.trigger(Events.removeWidget, widgetId);
  };

  this.updatedWidgets = function (widgets) {
    _this.trigger(Events.updatedWidgets, widgets);
  };
};
MicroEvent.mixin(AppDispatcher);

module.exports = new AppDispatcher();
