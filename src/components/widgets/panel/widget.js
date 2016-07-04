var React = require('react'),

    OS = require('os'),
    Widget = OS.Widget,
    Configurator = OS.Configurator,
    Link = OS.Link,

    settings = require('./widget_settings');

var _Widget = React.createClass({
  getInitialState: function () {
    return {
      widgetStyles: settings.DEFAULT_WIDGET_STYLES,
      shortcutStyles: settings.DEFAULT_SHORTCUT_STYLES,
      hoverShortcutStyles: settings.DEFAULT_HOVER_SHORTCUT_STYLES
    };
  },

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.state.widgetStyles }>
        <Link
          style={ this.state.shortcutStyles }
          hoverStyle={ this.state.hoverShortcutStyles }>

          <span className="glyphicon glyphicon-cog" />
        </Link>
      </Widget.Widget>
    );
  }
});

module.exports = _Widget;
