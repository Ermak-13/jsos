var ConfiguratorOpener = {
  _openConfigurator: function () {
    if (this.openConfigurator) return this.openConfigurator();

    this._getConfigurator().open();
  },

  _handleCloseConfigurator: function () {
    if (this.handleCloseConfigurator) return this.handleCloseConfigurator();

    this.configurator = null;

    var id = global.Settings.get('configurator_container_id'),
        element = document.getElementById(id);
    ReactDOM.unmountComponentAtNode(element);
  },

  _handleConfigure: function (settings) {
    if (this.handleConfigure) return this.handleConfigure(settings);

    var setSettings = this.setSettings || this._setSettings;
    setSettings(settings, this.saveSettings);
  },

  _getConfigurator: function () {
    if (this.getConfigurator) return this.getConfigurator();

    var id = global.Settings.get('configurator_container_id'),
        element = document.getElementById(id);

    this.configurator = this.configurator || global.ReactDOM.render(
      this._createConfigurator(), element
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
