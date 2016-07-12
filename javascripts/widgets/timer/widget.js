var React = require('react'),
    _ = require('underscore'),
    s = require('underscore.string'),
    sprintf = require('sprintf-js').sprintf,

    OS = require('os'),
    Mixins = OS.Mixins,
    Widget = OS.Widget,
    Configurator = OS.Configurator,

    settings = require('./settings');

var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getDefaultProps: function () {
    return {
      name: settings.WIDGET_NAME,
      configuratorRefName: settings.CONFIGURATOR_REF_NAME,
      updatedInterval: settings.DEFAULT_UPDATED_INTERVAL
    };
  },

  getInitialState: function () {
    return {
      startedMoment: null,
      duration: moment.duration(),
      records: [],
      isPlaying: false,

      widgetStyles: settings.DEFAULT_WIDGET_STYLES,
      timerStyles: settings.DEFAULT_TIMER_STYLES,
      hrStyles: settings.DEFAULT_HR_STYLES,
      recordContainerStyles: settings.DEFAULT_RECORD_CONTAINER_STYLES,
      recordStyles: settings.DEFAULT_RECORD_STYLES
    };
  },

  handlePlay: function (e) {
    e.preventDefault();

    var startedMoment = moment(),
        intervalId = setInterval(
          this.updateDuration,
          this.props.updatedInterval
        );

    this.setState({
      startedMoment: startedMoment,
      intervalId: intervalId,
      isPlaying: true
    }, this.save);
  },

  handleStop: function (e) {
    e.preventDefault();

    clearInterval(this.state.intervalId);
    this.setState({
      startedMoment: null,
      duration: moment.duration(),
      isPlaying: false,
      intervalId: null
    });
  },

  handleRecord: function (e) {
    e.preventDefault();

    var records = this.state.records;
    records.push(this.state.duration);

    this.setState({
      records: records
    });
  },

  updateDuration: function () {
    var startedMoment = this.state.startedMoment,
        duration = moment.duration(
          moment() - startedMoment
        );

    this.setState({
      duration: duration
    });
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

  getTimerText: function (duration) {
    return sprintf(
      '%(hours)s:%(minutes)s:%(seconds)s.%(milliseconds)s',
      {
        hours: this.formatNumber(duration.hours(), 2),
        minutes: this.formatNumber(duration.minutes(), 2),
        seconds: this.formatNumber(duration.seconds(), 2),
        milliseconds: this.formatNumber(duration.milliseconds(), 3)
      }
    );
  },

  formatNumber: function (value, length) {
    var numberArray = value.toString().split(''),
        numberLength = numberArray.length;

    _.times(length - numberLength, function () {
      numberArray.unshift('0');
    });

    return numberArray.join('');
  },

  componentWillMount: function () {
    this.init();
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
                { this.getPlayOrStopBtnHTML() }

                <RecordBtn
                  disabled={ !this.state.isPlaying }
                  onClick={ this.handleRecord }
                />
              </div>
            </div>

            <div className="col-md-8">
              <span style={ this.state.timerStyles }>
                { this.getTimerText(this.state.duration) }
              </span>
            </div>
          </div>

          <hr style={ this.state.hrStyles }/>

          { this.getRecordsHTML() }
        </Widget.Body>

        <Configurator.Default
          ref={ this.props.configuratorRefName }
          name={ this.props.name }
          settings={ this.getSettings() }
          onSubmit={ this.handleConfigure }
        />
      </Widget.Widget>
    );
  },

  getPlayOrStopBtnHTML: function () {
    if (this.state.isPlaying) {
      return (
        <StopBtn onClick={ this.handleStop }/>
      );
    } else {
      return (
        <PlayBtn onClick={ this.handlePlay }/>
      );
    }
  },

  getRecordsHTML: function () {
    var records = _.clone(this.state.records),
        records = records.reverse();

    var recordsHTML = _.map(records, function (record) {
      return (
        <div className="row" key={ record }>
          <div className="col-md-offset-4 col-md-8"
            style={ this.state.recordContainerStyles }>

            <span style={ this.state.recordStyles }>
              { this.getTimerText(record) }
            </span>
          </div>
        </div>
      );
    }.bind(this))

    return recordsHTML;
  }
});

var PlayBtn = React.createClass({
  render: function () {
    return (
      <button
        className="btn btn-default btn-xs"
        onClick={ this.props.onClick }>

        <span className="glyphicon glyphicon-play" />
      </button>
    );
  }
});

var StopBtn = React.createClass({
  render: function () {
    return (
      <button
        className="btn btn-default btn-xs"
        onClick={ this.props.onClick }>

        <span className="glyphicon glyphicon-stop" />
      </button>
    );
  }
});

var RecordBtn = React.createClass({
  render: function () {
    var btnClassName;
    if (this.props.disabled) {
      btnClassName = 'btn btn-default btn-xs disabled';
    } else {
      btnClassName = 'btn btn-default btn-xs';
    }

    return (
      <button
        className={ btnClassName }
        onClick={ this.props.onClick }>

        <span className="glyphicon glyphicon-check" />
      </button>
    )
  }
});

module.exports = _Widget;
