var React = require('react'),
    moment = require('moment'),

    OS = require('os'),
    Widget = OS.Widget,

    settings = require('./widget_settings');

var WIDGET_NAME = 'calendar';

var _Widget = React.createClass({
  name: settings.WIDGET_NAME,

  getInitialState: function () {
    return {
      _moment: moment(),

      widgetStyles: settings.DEFAULT_WIDGET_STYLES,
      calendarStyles: settings.DEFAULT_CALENDAR_STYLES,
      monthStyles: settings.DEFAULT_MONTH_STYLES,
      dayStyles: settings.DEFAULT_DAY_STYLES
    };
  },

  render: function () {
    return (
      <Widget
        name={ this.name }
        widgetHeaderDisabled={ true }
        widgetStyles={ this.state.widgetStyles }>

        <div style={ this.state.calendarStyles }>
          <div style={ this.state.monthStyles }>
            { this.state._moment.format('MMMM') }
          </div>

          <div style={ this.state.dayStyles }>
            { this.state._moment.format('D') }
          </div>
        </div>

      </Widget>
    );
  }
});

module.exports = _Widget;
