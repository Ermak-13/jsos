var ConfiguratorHelper = {
  open: function () {
    var refName = this.getRefName(),
        ref = this.refs[refName];

    ref.open();
  },

  close: function () {
    var refName = this.props.refName,
        ref = this.refs[refName];

    ref.close();
  },

  getRefName: function () {
    return this.props.refName || global.Settings.get(
      'default_configurator_ref_name'
    );
  }
};

module.exports = ConfiguratorHelper;
