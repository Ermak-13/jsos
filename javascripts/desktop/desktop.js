var React = require('react'),
    _ = require('underscore'),

    OS = require('os'),
    Mixins = OS.Mixins,

    Configurator = require('./configurator'),
    ConfigureBtn = require('./configure_btn');

var Desktop = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getDefaultProps: function () {
    return {
      name: global.Settings.get('desktop_name'),
      storageKey: global.Settings.get('desktop_storage_key'),
      configuratorRefName: global.Settings.get('desktop_configurator_ref_name')
    };
  },

  getInitialState: function () {
    return {
      widgets: global.Widgets.all(),

      desktopStyles: global.Settings.get('desktop_styles'),
      configureBtnStyles: global.Settings.get('desktop_configure_btn_styles')
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
    if (WidgetClass) {
      return React.createElement(
        WidgetClass,
        {
          key: nextWidgetId,
          widgetName: name,
          widgetId: nextWidgetId
        }
      );
    }
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
    var widgetsHTML = _.map(this.state.widgets, function (widget) {
      return this._createWidget(widget.widgetName, widget.widgetId);
    }.bind(this));

    return _.compact(widgetsHTML);
  }
});

module.exports = Desktop;
