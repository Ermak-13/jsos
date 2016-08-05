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
    return this.props.refName || 'configurator';
  }
};

module.exports = ConfiguratorHelper;
