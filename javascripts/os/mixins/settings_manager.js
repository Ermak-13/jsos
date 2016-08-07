var _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf;

var SettingsManager = {
  loadSettings: function () {
    if (this._loadSettings) return this._loadSettings();

    global.Storage.get(
      this.getSettingsStorageKey(),
      function (settings) {
        if (settings) {
          this.setSettings(settings);
        }
      }.bind(this)
    );
  },

  saveSettings: function () {
    if (this._saveSettings) return this._saveSettings();

    global.Storage.set(
      this.getSettingsStorageKey(),
      this.getSettings()
    );
  },

  getSettings: function () {
    if (this._getSettings) return this._getSettings();

    return _.clone(this.state);
  },

  setSettings: function (settings, callback) {
    if (this._setSettings) return this._setSettings(settings, callback);

    this.setState(settings, callback);
  },

  getSettingsStorageKey: function () {
    if (this._getSettingsStorageKey) return this._getSettingsStorageKey();

    return this.props.storageKey || this.props.settingsStorageKey || sprintf(
      global.Settings.get('widget_storage_key'),
      { id: this.props.widgetId }
    );
  }
};

module.exports = SettingsManager;
