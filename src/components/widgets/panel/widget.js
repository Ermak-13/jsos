var React = require('react'),
    _ = require('underscore'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Widget = OS.Widget,
    Configurator = OS.Configurator,
    Link = OS.Link,

    settings = require('./widget_settings'),
    Configurator = require('./configurator'),
    BookmarksShortcut = require('./bookmarks_shortcut');

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
      shortcutStyles: settings.DEFAULT_SHORTCUT_STYLES,
      hoverShortcutStyles: settings.DEFAULT_HOVER_SHORTCUT_STYLES
    };
  },

  setSettings: function (settings) {
    this.setState({
      widgetStyles: settings.widgetStyles
    });
  },

  getSettings: function () {
    return {
      widgetStyles: _.clone(this.state.widgetStyles)
    };
  },

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.state.widgetStyles }>
        <BookmarksShortcut
          style={ this.state.shortcutStyles }
          hoverStyle={ this.state.hoverShortcutStyles }
        />

        <Link
          style={ this.state.shortcutStyles }
          hoverStyle={ this.state.hoverShortcutStyles }
          onClick={ this.openConfigurator }>

          <span className="glyphicon glyphicon-cog" />
        </Link>

        <Configurator
          ref={ this.props.configuratorRefName }
          name={ this.props.name }
          settings={ this.getSettings() }
          onSubmit={ this.handleConfigure }
        />
      </Widget.Widget>
    );
  }
});

module.exports = _Widget;
