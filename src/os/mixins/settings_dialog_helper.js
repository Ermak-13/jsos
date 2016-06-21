var AppDispatcher = require('../app_dispatcher'),
    Events = require('../events');

var SettingsDialogHelper = {
  update: function (settings) {
    this.setState(
      { settings: settings },
      function () { this.save(); }.bind(this)
    );
  },

  save: function () {
    var event = Events.saveSettings(this.name);
    AppDispatcher.trigger(event, this.state.settings);
  },

  bindOpenDialog: function () {
    var event = Events.openSettingsDialog(this.name);

    AppDispatcher.bind(event, function (settings) {
      this.setState({ settings: settings }, function () {
        this.open();
      }.bind(this));
    }.bind(this));
  }
};

module.exports = SettingsDialogHelper;
