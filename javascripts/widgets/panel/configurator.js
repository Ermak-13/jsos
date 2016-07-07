var React = require('react'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Configurator = OS.Configurator,

    settings = require('./settings');

var _Configurator = React.createClass({
  mixins: [Mixins.ConfiguratorHelper, Mixins.NavHelper],

  getDefaultProps: function () {
    return {
      refName: settings.CONFIGURATOR_REF_NAME
    };
  },

  render: function () {
    return (
      <Configurator.DefaultDialog
        ref={ this.props.refName }
        name={ this.props.name }>
      </Configurator.DefaultDialog>
    );
  }
});

module.exports = _Configurator;
