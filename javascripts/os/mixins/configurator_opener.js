var sprintf = require('sprintf-js').sprintf;

var ConfiguratorOpener = {
  openConfigurator: function () {
    if (this._openConfigurator) return this._openConfigurator();

    this.getConfigurator().open();
  },

  handleCloseConfigurator: function () {
    if (this._handleCloseConfigurator) return this._handleCloseConfigurator();

    this.configurator = null;

    var id = global.Settings.get('configurator_container_id'),
        element = document.getElementById(id);

    global.OS.log('info', sprintf('Widget %s - unmount configurator.', this.getName()));
    ReactDOM.unmountComponentAtNode(element);
  },

  handleConfigure: function (settings) {
    if (this._handleConfigure) return this._handleConfigure(settings);

    this.getConfigurator().close();
    this.setSettings(settings, this.saveSettings);
  },

  getConfigurator: function () {
    if (this._getConfigurator) return this._getConfigurator();

    var id = global.Settings.get('configurator_container_id'),
        element = document.getElementById(id);

    this.configurator = this.configurator || global.ReactDOM.render(
      this.createConfigurator(), element
    );
    global.OS.log('info', sprintf('Widget %s - getConfigurator.', this.getName()));

    return this.configurator;
  },

  createConfigurator: function () {
    if (this._createConfigurator) return this._createConfigurator();
    if (this._getConfiguratorHTML) return this._getConfiguratorHTML();

    return React.createElement(
      global.OS.Configurator.Default,
      {
        name: this.getName(),
        settings: this.getSettings(),
        onClose: this.handleCloseConfigurator,
        onSubmit: this.handleConfigure
      }
    );
  }
};

module.exports = ConfiguratorOpener;
