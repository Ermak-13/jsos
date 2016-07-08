var React = require('react'),
    s = require('underscore.string'),

    OS = require('os'),
    globalSettings = OS.settings,
    AppDispatcher = OS.AppDispatcher,
    Events = OS.Events,

    Mixins = OS.Mixins,
    Widget = OS.Widget,
    Configurator = OS.Configurator,

    HForm = OS.HForm,

    settings = require('./settings');

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
      logs: [],
      widgetStyles: settings.DEFAULT_WIDGET_STYLES
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

  componentWillMount: function () {
    this.load();
  },

  componentDidMount: function () {
    AppDispatcher.bind(Events.log, function (level, message) {
      var logs = this.state.logs;
      logs.push({
        level: level,
        message: message
      });

      this.setState({ logs: logs });
    }.bind(this));
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
          <HForm.Form>
            <HForm.Field
              labelText="Filter:"
              labelClassName="control-label col-md-2"
              controlContainerClassName="col-md-10">

              <select className="form-control">
                <option>any</option>
              </select>
            </HForm.Field>
          </HForm.Form>

          <table className="table table-hover">
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

        <Configurator.Default
          ref={ this.props.configuratorRefName }
          name={ this.props.name }
          settings={ this.getSettings() }
          onSubmit={ this.handleConfigure }
        />
      </Widget.Widget>
    );
  },

  getLogsTrHTML: function () {
    var logs = _.clone(this.state.logs).reverse(),
        logsTrHTML = _.map(logs, function (log, i) {
          return (
            <tr key={ i }>
              <td>{ log.level }</td>
              <td>{ log.message }</td>
            </tr>
          );
        });

    return logsTrHTML;
  }
});

module.exports = _Widget;
