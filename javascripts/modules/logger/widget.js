var React = require('react'),
    s = require('underscore.string'),
    sprintf = require('sprintf-js').sprintf,

    OS = require('os'),
    Mixins = OS.Mixins,
    Widget = OS.Widget,

    HForm = OS.HForm,
    Select = OS.Select,
    Option = OS.Option,

    settings = require('./settings');

var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getInitialState: function () {
    return {
      logs: global.Logger.all(),
      filterLevel: settings.DEFAULT_FILTER_LEVEL,

      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION
    };
  },

  handleFilter: function (level) {
    this.setState({ filterLevel: level });
  },

  _getSettings: function () {
    return {
      size: _.clone(this.state.size),
      position: _.clone(this.state.position)
    };
  },

  componentWillMount: function () {
    this.init();

    global.Logger.updated(function (logs) {
      this.setState({ logs: logs });
    }.bind(this));
  },

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.getWidgetStyles() }>
        <Widget.DefaultHeader
          title={ s.capitalize(this.props.widgetName) }
          onMouseDownPositionBtn={ this.handleStartMoving }
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this.openConfigurator }
        />

        <Widget.Body>
          <HForm.Form>
            <HForm.Field
              containerStyle={{ marginBottom: 0 }}
              labelText="Filter:"
              labelClassName="control-label col-md-2"
              controlContainerClassName="col-md-10">

              <Select onChange={ this.handleFilter }>
                { this.getLevelOptionsHTML() }
              </Select>
            </HForm.Field>
          </HForm.Form>

          <table
            className="table table-hover"
            style={{ marginBottom: 0 }}>

            <thead>
              <tr>
                <th>level</th>
                <th>message</th>
              </tr>
            </thead>

            <tbody>
              { this.getLogsTrHTML() }
            </tbody>
          </table>
        </Widget.Body>
      </Widget.Widget>
    );
  },

  getLevelOptionsHTML: function () {
    var levels = _.map(this.state.logs, function (log) {
      return log.level;
    });

    levels.unshift(settings.DEFAULT_FILTER_LEVEL);
    levels = _.uniq(levels);

    var levelOptionsHTML = _.map(levels, function (level) {
      return (
        <Option
          key={ level }
          text={ level }
          value={ level }
        />
      );
    });

    return levelOptionsHTML;
  },

  getLogsTrHTML: function () {
    var logs = _.clone(this.state.logs);
        logs = _.filter(logs, function (log) {
          return (
            this.state.filterLevel === settings.DEFAULT_FILTER_LEVEL ||
            log.level === this.state.filterLevel
          );
        }.bind(this))

        convertLabelClassName = function (level) {
          var converter = {
            info: 'info',
            warning: 'warning',
            error: 'danger'
          };

          return converter[level] || 'default';
        },

        logsTrHTML = _.map(logs, function (log, i) {
          var labelClassName = sprintf(
            'label label-%s', convertLabelClassName(log.level)
          );

          return (
            <tr key={ i }>
              <td>
                <span className={ labelClassName }>
                  { log.level.toUpperCase() }
                </span>
              </td>
              <td>{ log.message }</td>
            </tr>
          );
        });


    return logsTrHTML;
  }
});

module.exports = _Widget;
