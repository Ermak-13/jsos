var React = require('react'),
    _ = require('underscore'),
    s = require('underscore.string'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Widget = OS.Widget,
    Configurator = OS.Configurator,

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
      widgetStyles: settings.DEFAULT_WIDGET_STYLES,
      timerStyles: settings.DEFAULT_TIMER_STYLES,
      hrStyles: settings.DEFAULT_HR_STYLES,
      recordContainerStyles: settings.DEFAULT_RECORD_CONTAINER_STYLES,
      recordStyles: settings.DEFAULT_RECORD_STYLES
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

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.state.widgetStyles }>
        <Widget.DefaultHeader
          title={ s.capitalize(this.props.name) }
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this.openConfigurator }
        />

        <Widget.Body>
          <div className="row">
            <div className="col-md-4">
              <div className="btn-group">
                <PlayBtn />
                <CheckBtn />
              </div>
            </div>

            <div className="col-md-8">
              <span style={ this.state.timerStyles }>
                00:00:00.000
              </span>
            </div>
          </div>

          <hr style={ this.state.hrStyles }/>

          <div className="row">
            <div className="col-md-offset-4 col-md-8"
              style={ this.state.recordContainerStyles }>

              <span style={ this.state.recordStyles }>
                00:00:00.000
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-md-offset-4 col-md-8"
              style={ this.state.recordContainerStyles }>

              <span style={ this.state.recordStyles }>
                00:00:00.000
              </span>
            </div>
          </div>
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

var PlayBtn = React.createClass({
  render: function () {
    return (
      <button
        className="btn btn-default btn-xs"
        onClick={ this.props.onClick }
      >
        <span className="glyphicon glyphicon-play" />
      </button>
    );
  }
});

var CheckBtn = React.createClass({
  render: function () {
    return (
      <button
        className="btn btn-default btn-xs"
        onClick={ this.props.onClick }
      >
        <span className="glyphicon glyphicon-check" />
      </button>
    )
  }
});

module.exports = _Widget;
