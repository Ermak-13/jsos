var React = require('react'),
    moment = require('moment'),

    OS = require('os'),
    Widget = OS._Widget,
    Mixins = OS.Mixins,

    settings = require('./widget_settings');

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
      updatedInterval: settings.DEFAULT_UPDATED_INTERVAL,

      widgetStyles: settings.DEFAULT_WIDGET_STYLES,
      calendarStyles: settings.DEFAULT_CALENDAR_STYLES,
      monthStyles: settings.DEFAULT_MONTH_STYLES,
      dayStyles: settings.DEFAULT_DAY_STYLES
    };
  },

  updateMoment: function () {
    this.setState({
      _moment: moment()
    });
  },

  //openSettingsDialog: function () {
  //  this._openSettingsDialog({
  //    widgetStyles: this.state.widgetStyles,
  //    calendarStyles: this.state.calendarStyles,
  //    monthStyles: this.state.monthStyles,
  //    dayStyles: this.state.dayStyles
  //  });
  //},

  componentDidMount: function () {
    var intervalId = setInterval(
      this.updateMoment,
      this.state.updatedInterval
    );
    this.setState({ intervalId: intervalId });

    //this.updateSettings(function (settings) {
    //  this.setState({
    //    widgetStyles: settings.widgetStyles,
    //    calendarStyles: settings.calendarStyles,
    //    monthStyles: settings.monthStyles,
    //    dayStyles: settings.dayStyles
    //  });
    //}.bind(this));
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
          <div style={ this.state.calendarStyles }>
            <div style={ this.state.monthStyles }>
              { this.state._moment.format('MMMM') }
            </div>

            <div style={ this.state.dayStyles }>
              { this.state._moment.format('D') }
            </div>
          </div>
        </Widget.Body>
      </Widget.Widget>
    );
  }
});

module.exports = _Widget;
