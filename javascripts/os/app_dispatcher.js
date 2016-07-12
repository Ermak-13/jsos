var MicroEvent = require('microevent'),
    Events = require('./events'),
    settings = require('./settings'),
    DEFAULT_SETTINGS_DIALOG_NAME = settings.DEFAULT_SETTINGS_DIALOG_NAME;

var AppDispatcher = function () {
  var _this = this;

  this.saveDesktop = function () {
    _this.trigger(Events.saveDesktop);
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

  this.log = function (level, message) {
    _this.trigger(Events.log, level, message);
  };
};
MicroEvent.mixin(AppDispatcher);

module.exports = new AppDispatcher();
