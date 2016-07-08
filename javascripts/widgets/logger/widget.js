var React = require('react'),
    s = require('underscore.string'),

    OS = require('os'),
    globalSettings = OS.settings,
    Mixins = OS.Mixins,
    Widget = OS.Widget,
    Configurator = OS.Configurator,

    settings = require('./settings');

var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getDefaultProps: function () {
    return {
      name: settings.WIDGET_NAME,
      configuratorRefName: settings.CONFIGURATOR_REF_NAME
    };
  },

  getInitialState: function () {
    return {
      logs: [],
      widgetStyles: settings.DEFAULT_WIDGET_STYLES
    };
  },

  setSettings: function (settings) {
    this.setState({
      widgetStyles: settings.widgetStyles
    }, this.save);
  },

  getSettings: function () {
    return {
      widgetStyles: _.clone(this.state.widgetStyles)
    };
  },

  componentWillMount: function () {
    this.load();
  },

  render: function () {
    console.log(this.props);
    console.log(s.capitalize(this.props.name));
    return (
      <Widget.Widget widgetStyles={ this.state.widgetStyles }>
        <Widget.DefaultHeader
          title={ s.capitalize(this.props.name) }
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this.openConfigurator }
        />

        <Widget.Body>
          Oops
        </Widget.Body>

        <Configurator.Default
          ref={ this.props.configuratorRefName }
          name={ this.props.name }
          settings={ this.getSettings() }
          onSubmit={ this.handleConfigure }
        />
      </Widget.Widget>
    );
  }
});

module.exports = _Widget;
