var React = require('react'),
    moment = require('moment-timezone'),
    _ = require('underscore'), 
    OS = require('os'),

    Widget = OS.Widget,
    Mixins = OS.Mixins,
    AppDispatcher= OS.AppDispatcher,

    settings = require('./settings'),
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

      location: null,
      timezone: moment.tz.guess(),

      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION,
      widgetStyles: settings.DEFAULT_WIDGET_STYLES,
      timeStyles: settings.DEFAULT_TIME_STYLES,
      locationStyles: settings.DEFAULT_LOCATION_STYLES
    };
  },

  setSettings: function (settings, callback) {
    this._setSettings(settings, function () {
      this.refreshInterval();

      callback = callback || function () {};
      callback();
    });
  },

  getSettings: function () {
    return {
      format: this.state.format,
      updatedInterval: this.state.updatedInterval,
      location: this.state.location,
      timezone: this.state.timezone,

      size: _.clone(this.state.size),
      position: _.clone(this.state.position),
      timeStyles: _.clone(this.state.timeStyles),
      locationStyles: _.clone(this.state.locationStyles)
    };
  },

  getTime: function () {
    return this.state._moment
           .tz(this.state.timezone)
           .format(this.state.format);
  },

  refreshInterval: function () {
    this.clearInterval();
    this.setInterval();
  },

  setInterval: function () {
    var intervalId = setInterval(
      this.updateMoment,
      this.state.updatedInterval
    );
    this.setState({ intervalId: intervalId });
  },

  clearInterval: function () {
    clearInterval(this.state.intervalId);
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
    this.setInterval();
  },

  componentWillUnmount: function () {
    this.clearInterval();
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
          <div style={ this.state.timeStyles }>
            { this.getTime() }
          </div>

          { this.getLocationHTML() }
        </Widget.Body>

        <Configurator
          ref={ this.props.configuratorRefName }
          name={ this.props.name }
          settings={ this.getSettings() }
          onSubmit={ this.handleConfigure }
        />
      </Widget.Widget>
    );
  },

  getLocationHTML: function () {
    if (this.state.location) {
      return (
        <div style={ this.state.locationStyles }>
          { this.state.location }
        </div>
      );
    }
  }
});

module.exports = _Widget;
