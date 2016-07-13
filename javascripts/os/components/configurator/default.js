var React = require('react'),
    _ = require('underscore'),

    Mixins = require('../../mixins'),
    PositionAndSizeForm = require('../position_and_size_form'),
    DefaultDialog = require('./default_dialog');

var Default = React.createClass({
  mixins: [Mixins.ConfiguratorHelper],

  getDefaultProps: function () {
    return {
      refName: 'default'
    };
  },

  handleSubmit: function (widgetStyles) {
    var settings = _.clone(this.props.settings);
    settings.widgetStyles = widgetStyles;
    this.props.onSubmit(settings);
  },

  render: function () {
    return (
      <DefaultDialog
        ref={ this.props.refName }
        name={ this.props.name }>

        <PositionAndSizeForm
          onSubmit={ this.handleSubmit }
          settings={ this.props.settings }
        />
      </DefaultDialog>
    );
  }
});

module.exports = Default;
