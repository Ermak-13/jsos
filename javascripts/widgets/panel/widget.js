var React = require('react'),
    _ = require('underscore'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Widget = OS.Widget,
    Link = OS.Link,

    settings = require('./settings'),
    Configurator = require('./configurator'),
    BookmarksShortcut = require('./bookmarks_shortcut'),
    HistoryShortcut = require('./history_shortcut'),
    DownloadsShortcut = require('./downloads_shortcut');

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
      panelStyles: settings.DEFAULT_PANEL_STYLES,
      shortcutStyles: settings.DEFAULT_SHORTCUT_STYLES
    };
  },

  setSettings: function (settings) {
    this.setState({
      panelStyles: settings.panelStyles
    });
  },

  getSettings: function () {
    return {
      panelStyles: _.clone(this.state.panelStyles)
    };
  },

  render: function () {
    return (
      <div className="panel" style={ this.state.panelStyles }>
        <BookmarksShortcut
          className="shortcut"
          style={ this.state.shortcutStyles }
        />

        <HistoryShortcut
          className="shortcut"
          style={ this.state.shortcutStyles }
        />

        <DownloadsShortcut
          className="shortcut"
          style={ this.state.shortcutStyles }
        />

        <Link
          className="shortcut"
          style={ this.state.shortcutStyles }
          onClick={ this.openConfigurator }>

          <span className="glyphicon glyphicon-cog" />
        </Link>

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

module.exports = _Widget;
