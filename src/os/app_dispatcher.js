var MicroEvent = require('microevent'),
    Events = require('./events'),
    settings = require('./settings'),
    DEFAULT_SETTINGS_DIALOG_NAME = settings.DEFAULT_SETTINGS_DIALOG_NAME;

var AppDispatcher = function () {
  var _this = this;

  this.openDefaultSettingsDialog = function (widgetName, settings) {
    var event = Events.openSettingsDialog(DEFAULT_SETTINGS_DIALOG_NAME);
    _this.trigger(event, widgetName, settings);
  };
};
MicroEvent.mixin(AppDispatcher);

module.exports = new AppDispatcher();
