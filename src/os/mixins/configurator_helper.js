var ConfiguratorHelper = {
  open: function () {
    var refName = this.props.refName,
        ref = this.refs[refName];

    ref.open();
  },

  close: function () {
    var refName = this.props.refName,
        ref = this.refs[refName];

    ref.close();
  }
};

module.exports = ConfiguratorHelper;
