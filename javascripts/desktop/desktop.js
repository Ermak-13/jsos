var React = require('react'),
    _ = require('underscore'),

    OS = require('os'),
    Mixins = OS.Mixins,
    AppDispatcher = OS.AppDispatcher,
    Events = OS.Events,

    Configurator = require('./configurator');

var Desktop = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getDefaultProps: function () {
    return {
      name: global.Settings.get('desktop_name'),
      storageKey: global.Settings.get('desktop_storage_key')
    };
  },

  getInitialState: function () {
    return {
      widgets: global.Widgets.all(),

      desktopStyles: global.Settings.get('desktop_styles')
    };
  },

  getSettings: function () {
    return {
      desktopStyles: _.clone(this.state.desktopStyles),
    };
  },

  _createWidget: function (name, nextWidgetId) {
    var WidgetClass = global.Modules.getWidget(name);
    return React.createElement(
      WidgetClass,
      {
        key: nextWidgetId,
        widgetName: name,
        widgetId: nextWidgetId
      }
    );
  },

  componentWillMount: function () {
    this.load();

    global.Modules.updated(function (modules) {
      this.forceUpdate();
    }.bind(this));

    global.Widgets.updated(function (widgets) {
      this.setState({ widgets: widgets });
    }.bind(this));

    AppDispatcher.bind(Events.openDesktopConfigurator, this.openConfigurator);
  },

  render: function () {
    return (
      <div className="desktop" style={ this.state.desktopStyles }>
        { this.getWidgetsHTML() }
      </div>
    );
  },

  _createConfigurator: function () {
    return (
      <Configurator
        name={ this.getName() }
        settings={ this.getSettings() }
        onSubmit={ this.handleConfigure }
      />
    );
  },

  getWidgetsHTML: function () {
    var widgets = _.filter(this.state.widgets, function (widget) {
          return global.Modules.isInstalled(widget.widgetName);
        }),

        widgetsHTML = _.map(widgets, function (widget) {
          return this._createWidget(widget.widgetName, widget.widgetId);
        }.bind(this));

    return _.compact(widgetsHTML);
  }
});

module.exports = Desktop;
