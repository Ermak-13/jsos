var React = require('react'),
    moment = require('moment'),
    _ = require('underscore'), 
    OS = require('os'),

    Widget = OS.Widget,
    Mixins = OS.Mixins,
    AppDispatcher= OS.AppDispatcher,

    settings = require('./widget_settings'),
    Configurator = require('./configurator');

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
      _moment: moment(),
      format: settings.DEFAULT_FORMAT,
      updatedInterval: settings.DEFAULT_UPDATED_INTERVAL,

      widgetStyles: settings.DEFAULT_WIDGET_STYLES,
      timeStyles: settings.DEFAULT_TIME_STYLES
    };
  },

  handleConfigure: function (settings) {
    this.setSettings(settings);
  },

  setSettings: function (settings) {
    this.setState({
      format: settings.format,
      updatedInterval: settings.updatedInterval,
      widgetStyles: settings.widgetStyles,
      timeStyles: settings.timeStyles
    }, function () {
      AppDispatcher.changedWidget(
        this.props.widgetId,
        this.getSettings()
      );
    }.bind(this));
  },

  getSettings: function () {
    return {
      format: this.state.format,
      updatedInterval: this.state.updatedInterval,
      widgetStyles: _.clone(this.state.widgetStyles),
      timeStyles: _.clone(this.state.timeStyles)
    };
  },

  getTime: function () {
    return this.state._moment.format(
      this.state.format
    );
  },

  updateMoment: function () {
    this.setState({
      _moment: moment()
    });
  },

  componentDidMount: function () {
    var intervalId = setInterval(
      this.updateMoment,
      this.state.updatedInterval
    );
    this.setState({ intervalId: intervalId });
  },

  componentWillUnmount: function () {
    clearInterval(this.state.intervalId);
  },

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.state.widgetStyles }>
        <Widget.DefaultIconsContainer
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this.openConfigurator }
        />

        <Widget.Body>
          <div style={ this.state.timeStyles }>
            { this.getTime() }
          </div>
        </Widget.Body>

        <Configurator
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
