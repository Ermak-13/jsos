var ConfiguratorOpener = {
  openConfigurator: function () {
    var refName = this.getConfiguratorRefName(),
        ref = this.refs[refName];

    ref.open();
  },

  handleConfigure: function (settings) {
    var setSettings = this.setSettings || this._setSettings;
    setSettings(settings, this.saveSettings);
  },

  getConfiguratorRefName: function () {
    return this.props.configuratorRefName || global.Settings.get(
      'default_configurator_ref_name'
    );
  }
};

module.exports = ConfiguratorOpener;
