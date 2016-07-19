var React = require('react'),
    _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    OS = require('os'),
    globalSettings = OS.settings,
    AppDispatcher = OS.AppDispatcher,
    Events = OS.Events,
    Mixins = OS.Mixins,
    storage = OS.storage,
    log = OS.log,

    Configurator = require('./configurator'),
    ConfigureBtn = require('./configure_btn');

var Desktop = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getDefaultProps: function () {
    return {
      name: globalSettings.DESKTOP_NAME,
      storageKey: globalSettings.DESKTOP_STORAGE_KEY,
      widgetsStorageKey: globalSettings.DESKTOP_WIDGETS_STORAGE_KEY,
      configuratorRefName: globalSettings.DESKTOP_CONFIGURATOR_REF_NAME
    };
  },

  getInitialState: function () {
    return {
      widgets: [],
      nextWidgetId: 0,

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

  saveDesktop: function () {
    var serializedWidgets = _.map(this.state.widgets, function (widget) {
      return {
        widgetName: widget.props.widgetName,
        widgetId: widget.props.widgetId
      };
    });

    storage.set(this.props.widgetsStorageKey, serializedWidgets);
    log('info', 'Desktop is saved.');
  },

  loadDesktop: function (serializedWidgets) {
    var widgets = this.state.widgets,
        nextWidgetId = this.state.nextWidgetId;

    _.each(serializedWidgets, function (serializedWidget) {
      var widgetName = serializedWidget.widgetName,
          widgetId = serializedWidget.widgetId;

      widgets.push(
        this._createWidget(widgetName, widgetId)
      );
      nextWidgetId = widgetId + 1;
    }.bind(this));

    this.setState({
      widgets: widgets,
      nextWidgetId: nextWidgetId
    });
    log('info', 'Desktop is loaded.');
  },

  addWidget: function (widgetName) {
    var widgets = this.state.widgets,
        nextWidgetId = this.state.nextWidgetId;

    widgets.push(
      this._createWidget(widgetName, nextWidgetId)
    );

    this.setState({
      widgets: widgets,
      nextWidgetId: nextWidgetId + 1
    }, AppDispatcher.saveDesktop);
  },

  _createWidget: function (widgetName, nextWidgetId) {
    var WidgetClass = global.Widgets[widgetName].Widget;
    return React.createElement(
      WidgetClass,
      {
        key: nextWidgetId,
        widgetName: widgetName,
        widgetId: nextWidgetId
      }
    );
  },

  removeWidget: function (widgetId) {
    var widgets = _.filter(this.state.widgets, function (widget) {
      return widget.props.widgetId !== widgetId;
    });

    this.setState({
      widgets: widgets
    }, AppDispatcher.saveDesktop);
  },

  componentWillMount: function () {
    this.load();
  },

  componentDidMount: function () {
    AppDispatcher.bind(Events.saveDesktop, function () {
      this.saveDesktop();
    }.bind(this));

    storage.get(this.props.widgetsStorageKey, this.loadDesktop);

    AppDispatcher.bind(Events.addWidget, function (WidgetClass) {
      this.addWidget(WidgetClass);
    }.bind(this));

    AppDispatcher.bind(Events.removeWidget, function (widgetId) {
      this.removeWidget(widgetId);
    }.bind(this));
  },

  render: function () {
    return (
      <div className="desktop" style={ this.state.desktopStyles }>
        { this.state.widgets }

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
  }
});

module.exports = Desktop;
