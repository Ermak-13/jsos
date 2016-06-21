var React = require('react'),
    moment = require('moment'),
    _ = require('underscore'), 
    OS = require('os'),

    settings = OS.settings,
    AppDispatcher = OS.AppDispatcher,
    Events = OS.Events,
    Widget = OS.Widget,

    widgetSettings = require('./widget_settings'),
    _SettingsDialog = require('./settings_dialog');

var _Widget = React.createClass({
  getInitialState: function () {
    return {
      _moment: moment(),
      format: widgetSettings.DEFAULT_FORMAT,
      updatedInterval: widgetSettings.DEFAULT_UPDATED_INTERVAL,

      widgetStyles: widgetSettings.DEFAULT_WIDGET_STYLES,
      timeStyles: widgetSettings.DEFAULT_TIME_STYLES
    };
  },

  getTime: function () {
    return this.state._moment.format(
      this.state.format
    );
  },

  getTimeStyles: function () {
    return _.clone(this.state.timeStyles);
  },

  updateMoment: function () {
    this.setState({
      _moment: moment()
    });
  },

  openSettingsDialog: function () {
    var event = Events.openSettingsDialog(widgetSettings.WIDGET_NAME);

    AppDispatcher.trigger(event, {
      format: this.state.format,
      updatedInterval: this.state.updatedInterval,
      widgetStyles: this.state.widgetStyles,
      timeStyles: this.state.timeStyles
    });
  },

  componentDidMount: function () {
    setInterval(
      this.updateMoment,
      this.state.updatedInterval
    );

    var event = Events.saveSettings(widgetSettings.WIDGET_NAME);
    AppDispatcher.bind(event, function (settings) {
      this.setState({
        format: settings.format,
        updatedInterval: settings.updatedInterval,
        widgetStyles: settings.widgetStyles,
        timeStyles: settings.timeStyles
      });
    }.bind(this));
  },

  render: function () {
    return (
      <Widget
        name={ widgetSettings.WIDGET_NAME }
        widgetHeaderDisabled={ true }
        widgetStyles={ this.state.widgetStyles }
        openSettingsDialog={ this.openSettingsDialog }>

        <div style={ this.getTimeStyles() }>
          { this.getTime() }
        </div>
      </Widget>
    );
  }
});

module.exports = _Widget;
