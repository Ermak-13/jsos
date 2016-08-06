var ConfiguratorOpener = {
  _openConfigurator: function () {
    if (this.openConfigurator) return this.openConfigurator();

    this._getConfigurator().open();
  },

  _handleCloseConfigurator: function () {
    if (this.handleCloseConfigurator) return this.handleCloseConfigurator();

    this.configurator = null;
    ReactDOM.unmountComponentAtNode(
      document.getElementById('configurator-container')
    );
  },

  _handleConfigure: function (settings) {
    if (this.handleConfigure) return this.handleConfigure(settings);

    var setSettings = this.setSettings || this._setSettings;
    setSettings(settings, this.saveSettings);
  },

  _getConfigurator: function () {
    if (this.getConfigurator) return this.getConfigurator();

    this.configurator = this.configurator || global.ReactDOM.render(
      this._createConfigurator(),
      document.getElementById('configurator-container')
    );

    return this.configurator;
  },

  _createConfigurator: function () {
    if (this.createConfigurator) return this.createConfigurator();
    if (this.getConfiguratorHTML) return this.getConfiguratorHTML();

    return React.createElement(
      global.OS.Configurator.Default,
      {
        name: this.getName(),
        settings: this.getSettings(),
        onClose: this._handleCloseConfigurator,
        onSubmit: this._handleConfigure
      }
    );
  }
};

module.exports = ConfiguratorOpener;
