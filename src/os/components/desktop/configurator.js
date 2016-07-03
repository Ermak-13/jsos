var React = require('react'),

    Mixins = require('../../mixins'),
    Configurator = require('../configurator');

var _Configurator = React.createClass({
  mixins: [Mixins.ConfiguratorHelper],

  getDefaultProps: function () {
    return {
      refName: 'configurator'
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
