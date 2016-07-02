var MicroEvent = require('microevent'),
    Events = require('./events'),
    settings = require('./settings'),
    DEFAULT_SETTINGS_DIALOG_NAME = settings.DEFAULT_SETTINGS_DIALOG_NAME;

var AppDispatcher = function () {
  var _this = this;

  this.saveDesktop = function () {
    _this.trigger(Events.saveDesktop);
  };

  this.addWidget = function (WidgetClass) {
    _this.trigger(Events.addWidget, WidgetClass);
  };

  this.removeWidget = function (widgetId) {
    _this.trigger(Events.removeWidget, widgetId);
  };

  this.changedWidget = function (widgetId, settings) {
    _this.trigger(Events.changedWidget, widgetId, settings);
  };
};
MicroEvent.mixin(AppDispatcher);

module.exports = new AppDispatcher();
