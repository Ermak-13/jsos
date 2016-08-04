var sprintf = require('sprintf-js').sprintf;

var SettingsManager = {
  loadSettings: function () {
    global.Storage.get(
      this.getSettingsStorageKey(),
      function (settings) {
        var setSettings = this.setSettings || this._setSettings;

        if (settings) {
          setSettings(settings);
        }
      }.bind(this)
    );
  },

  saveSettings: function () {
    global.Storage.set(
      this.getSettingsStorageKey(),
      this.getSettings()
    );
  },

  _setSettings: function (settings, callback) {
    this.setState(settings, callback);
  },

  getSettingsStorageKey: function () {
    if (this.props.storageKey) {
      return this.props.storageKey;
    } else {
      return this._getSettingsStorageKey();
    }
  },

  _getSettingsStorageKey: function () {
    return sprintf(
      global.Settings.get('widget_storage_key'),
      { id: this.props.widgetId }
    );
  }
};

module.exports = SettingsManager;
