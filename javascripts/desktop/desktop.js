var React = require('react'),
    _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings,
    Mixins = OS.Mixins,

    Configurator = require('./configurator'),
    ConfigureBtn = require('./configure_btn');

var Desktop = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getDefaultProps: function () {
    return {
      name: globalSettings.DESKTOP_NAME,
      storageKey: globalSettings.DESKTOP_STORAGE_KEY,
      configuratorRefName: globalSettings.DESKTOP_CONFIGURATOR_REF_NAME
    };
  },

  getInitialState: function () {
    return {
      widgets: global.Widgets.all(),

      desktopStyles: globalSettings.DESKTOP_STYLES,
      configureBtnStyles: globalSettings.DESKTOP_CONFIGURE_BTN_STYLES
    };
  },

  getSettings: function () {
    return {
      desktopStyles: _.clone(this.state.desktopStyles),
      configureBtnStyles: _.clone(this.state.configureBtnStyles)
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

    global.Widgets.updated(function (widgets) {
      this.setState({ widgets: widgets });
    }.bind(this));
  },

  render: function () {
    return (
      <div className="desktop" style={ this.state.desktopStyles }>
        { this.getWidgetsHTML() }

        <ConfigureBtn
          style={ this.state.configureBtnStyles }
          onClick={ this.openConfigurator }
        />

        <Configurator
          ref={ this.props.configuratorRefName }
          name={ this.props.name }
          settings={ this.getSettings() }
          onSubmit={ this.handleConfigure }
        />
      </div>
    );
  },

  getWidgetsHTML: function () {
    return _.map(this.state.widgets, function (widget) {
      return this._createWidget(widget.widgetName, widget.widgetId);
    }.bind(this));
  }
});

module.exports = Desktop;
