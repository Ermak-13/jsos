var AppDispatcher = require('../app_dispatcher'),
    Events = require('../events');

var WidgetHelper = {
  _openSettingsDialog: function (settings) {
    AppDispatcher.openSettingsDialog(
      this.getSettingsDialogName(),
      settings
    );
  },

  openDefaultSettingsDialog: function () {
    this._openDefaultSettingsDialog({
      widgetStyles: this.state.widgetStyles
    });
  },

  _openDefaultSettingsDialog: function (settings) {
    AppDispatcher.openDefaultSettingsDialog(this.name, settings);
  },

  updateSettings: function (callback) {
    var event = Events.updateSettings(
      this.getSettingsDialogName()
    );

    AppDispatcher.bind(event, callback);
  },

  getSettingsDialogName: function () {
    return this.settingsDialogName || this.name;
  }
};

module.exports = WidgetHelper;
