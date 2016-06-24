var AppDispatcher = require('../app_dispatcher'),
    Events = require('../events');

var SettingsDialogHelper = {
  update: function (settings) {
    var callback = function () {
      this.save();
    }.bind(this);

    this.setState(
      { settings: settings },
      callback
    );
  },

  save: function () {
    var event = Events.updateSettings(
      this.name
    );
    AppDispatcher.trigger(event, this.state.settings);
  },

  open: function (callback) {
    var event = Events.openSettingsDialog(
      this.name
    );

    AppDispatcher.bind(event, callback);
  }
};

module.exports = SettingsDialogHelper;
