var MicroEvent = require('microevent'),
    Events = require('./events'),
    settings = require('./settings'),
    DEFAULT_SETTINGS_DIALOG_NAME = settings.DEFAULT_SETTINGS_DIALOG_NAME;

var AppDispatcher = function () {
  var _this = this;

  this.log = function (level, message) {
    _this.trigger(Events.log, level, message);
  };

  this.saveDesktop = function () {
    _this.trigger(Events.saveDesktop);
  };

  this.installModule = function (name, module) {
    _this.trigger(Events.installModule, name, module);
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

  this.addWidget = function (WidgetClass) {
    _this.trigger(Events.addWidget, WidgetClass);
  };

  this.removeWidget = function (widgetId) {
    _this.trigger(Events.removeWidget, widgetId);
  };
};
MicroEvent.mixin(AppDispatcher);

module.exports = new AppDispatcher();
