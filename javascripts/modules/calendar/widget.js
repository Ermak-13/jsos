var React = require('react'),
    moment = require('moment'),

    OS = require('os'),
    Widget = OS.Widget,
    Mixins = OS.Mixins,

    settings = require('./settings'),
    Configurator = require('./configurator');

var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getInitialState: function () {
    return {
      _moment: moment(),
      updatedInterval: settings.DEFAULT_UPDATED_INTERVAL,

      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION,

      calendarStyles: settings.DEFAULT_CALENDAR_STYLES,
      monthStyles: settings.DEFAULT_MONTH_STYLES,
      dayStyles: settings.DEFAULT_DAY_STYLES
    };
  },

  _getSettings: function () {
    return {
      size: _.clone(this.state.size),
      position: _.clone(this.state.position),

      calendarStyles: _.clone(this.state.calendarStyles),
      monthStyles: _.clone(this.state.monthStyles),
      dayStyles: _.clone(this.state.dayStyles)
    };
  },

  updateMoment: function () {
    this.setState({
      _moment: moment()
    });
  },

  componentWillMount: function () {
    this.init();
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
      <Widget.Widget widgetStyles={ this.getWidgetStyles() }>
        <Widget.DefaultIconsContainer
          onMouseDownPositionBtn={ this.handleStartMoving }
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this.openConfigurator }
        />

        <Widget.Body>
          <div style={ this.state.calendarStyles }>
            <div style={ this.state.dayStyles }>
              { this.state._moment.format('D') }
            </div>

            <div style={ this.state.monthStyles }>
              { this.state._moment.format('MMMM') }
            </div>
          </div>
        </Widget.Body>
      </Widget.Widget>
    );
  },

  _createConfigurator: function () {
    return (
      <Configurator
        name={ this.getName() }
        settings={ this.getSettings() }
        onClose={ this.handleCloseConfigurator }
        onSubmit={ this.handleConfigure }
      />
    );
  }
});

module.exports = _Widget;
