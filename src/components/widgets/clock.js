var React = require('react'),
    moment = require('moment'),
    _ = require('underscore'),

    settings = require('../../settings'),
    AppDispatcher = require('../../app_dispatcher'),
    Events = require('../../events'),

    Widget = require('../widget'),
    SettingsDialog = require('../settings_dialog');

var WIDGET_NAME = 'clock',
    OPEN_SETTINGS_DIALOG_EVENT_NAME = Events.openSettingsDialog(WIDGET_NAME);

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
    AppDispatcher.trigger(OPEN_SETTINGS_DIALOG_EVENT_NAME, {});
  },

  componentDidMount: function () {
    setInterval(
      this.updateMoment,
      this.state.updatedInterval
    );
  },

  render: function () {
    return (
      <Widget
        name={ WIDGET_NAME }
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

var _SettingsDialog = React.createClass({
  componentDidMount: function () {
    AppDispatcher.bind(OPEN_SETTINGS_DIALOG_EVENT_NAME, function (settings) {
      this.refs.dialog.open();
    }.bind(this));
  },

  render: function () {
    return (
      <SettingsDialog
        ref="dialog"
        name="clock">
      </SettingsDialog>
    );
  }
});

module.exports = {
  Widget: _Widget,
  SettingsDialog: _SettingsDialog
}
