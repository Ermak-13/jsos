var React = require('react'),
    moment = require('moment'),
    _ = require('underscore'), 
    OS = require('os'),

    Widget = OS.Widget,
    Mixins = OS.Mixins,

    settings = require('./widget_settings'),
    _SettingsDialog = require('./settings_dialog');

var _Widget = React.createClass({
  name: settings.WIDGET_NAME,
  settingsDialogName: settings.SETTINGS_DIALOG_NAME,

  mixins: [Mixins.WidgetHelper],

  getInitialState: function () {
    return {
      _moment: moment(),
      format: settings.DEFAULT_FORMAT,
      updatedInterval: settings.DEFAULT_UPDATED_INTERVAL,

      widgetStyles: settings.DEFAULT_WIDGET_STYLES,
      timeStyles: settings.DEFAULT_TIME_STYLES
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
    this._openSettingsDialog({
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

    this.updateSettings(function (settings) {
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
        name={ this.name }
        widgetHeaderDisabled={ true }
        widgetStyles={ this.state.widgetStyles }
        openSettingsDialog={ this.openSettingsDialog }
        closeWidget={ this.closeWidget }>

        <div style={ this.getTimeStyles() }>
          { this.getTime() }
        </div>
      </Widget>
    );
  }
});

module.exports = _Widget;
