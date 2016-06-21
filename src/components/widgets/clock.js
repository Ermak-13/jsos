var React = require('react'),
    moment = require('moment'),
    _ = require('underscore'), 
    OS = require('os'),

    settings = OS.settings,
    AppDispatcher = OS.AppDispatcher,
    Widget = OS.Widget,

    widgetSettings = require('./clock/widget_settings'),
    _SettingsDialog = require('./clock/settings_dialog');

var _Widget = React.createClass({
  getInitialState: function () {
    return {
      _moment: moment(),
      format: 'HH:mm',
      updatedInterval: 60 * 1000,

      widgetStyles: _.extend(
        settings.DEFAULT_WIDGET_STYLES,
        {
          width: '150px',
          height: '100px'
        }
      ),

      timeStyles: {
        height: '80px',
        lineHeight: '80px',
        textAlign: 'center',
        fontSize: '28px'
      }
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

  openSettingsDialog: function () {
    AppDispatcher.trigger(widgetSettings.OPEN_SETTINGS_DIALOG_EVENT, {
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

    AppDispatcher.bind(widgetSettings.SAVE_SETTINGS_EVENT, function (settings) {
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

        <div style={ this.state.timeStyles }>
          { this.getTime() }
        </div>
      </Widget>
    );
  }
});

module.exports = {
  Widget: _Widget,
  SettingsDialog: _SettingsDialog
}
