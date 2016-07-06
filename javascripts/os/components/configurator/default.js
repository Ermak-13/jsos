var React = require('react'),
    _ = require('underscore'),

    Mixins = require('../../mixins'),
    DefaultDialog = require('./default_dialog'),
    WidgetStylesForm = require('../widget_styles_form');

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

        <WidgetStylesForm
          onSubmit={ this.handleSubmit }
          settings={ this.props.settings.widgetStyles }
        />
      </DefaultDialog>
    );
  }
});

module.exports = Default;
