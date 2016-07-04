var React = require('react'),

    Mixins = require('../../mixins'),
    Configurator = require('../configurator'),
    HForm = require('../hform'),
    Input = require('../input');

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

          <HForm.Submit value="Save" />
        </HForm.Form>

      </Configurator.DefaultDialog>
    );
  }
});

module.exports = _Configurator;
