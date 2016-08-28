var ConfiguratorHelper = {
  open: function () {
    if (this._open) return this._open();

    var refName = this.getRefName(),
        ref = this.refs[refName];

    ref.open();
  },

  close: function () {
    if (this._close) return this._close();

    var refName = this.getRefName(),
        ref = this.refs[refName];

    ref.close();
  },

  getRefName: function () {
    if (this._getRefName) return this._getRefName();

    return this.props.refName || global.Settings.get(
      'default_configurator_ref_name'
    );
  }
};

module.exports = ConfiguratorHelper;
