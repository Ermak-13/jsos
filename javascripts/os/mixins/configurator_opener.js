var ConfiguratorOpener = {
  openConfigurator: function () {
    var refName = this.props.configuratorRefName,
        ref = this.refs[refName];

    ref.open();
  },

  handleConfigure: function (settings) {
    var setSettings = this.setSettings || this._setSettings;
    setSettings(settings, this.saveSettings);
  },

  getConfiguratorRefName: function () {
    return this.props.configuratorRefName || 'configurator';
  }
};

module.exports = ConfiguratorOpener;
