var React = require('react'),
    _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

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
      left: true,
      top: false,
      right: false,
      bottom: false,
      vertical: true,
      horizontal: false,

      shortcutStyles: settings.DEFAULT_SHORTCUT_STYLES
    };
  },

  getPanelStyles: function () {
    return {
      'left-vertical': {
        height: '100%',
        left: 0,
        top: 0
      },

      'right-vertical': {
        height: '100%',
        right: 0,
        top: 0
      },

      'top-horizontal': {
        width: '100%',
        left: 0,
        top: 0
      },

      'bottom-horizontal': {
        width: '100%',
        left: 0,
        bottom: 0
      }
    }[this.getPanelKey()];
  },

  getPanelKey: function () {
    var _this = this,
        finder = function (keys) {
          return _.find(keys, function (key) {
            return _this.state[key];
          });
        },

        key = sprintf(
          '%s-%s',
          finder(['left', 'top', 'right', 'bottom']),
          finder(['vertical', 'horizontal'])
        );

    return key;
  },

  setSettings: function (settings) {
    this.setState({
      left: settings.left,
      top: settings.top,
      right: settings.right,
      bottom: settings.bottom,
      vertical: settings.vertical,
      horizontal: settings.horizontal
    });
  },

  getSettings: function () {
    return {
      left: this.state.left,
      top: this.state.top,
      right: this.state.right,
      bottom: this.state.bottom,
      vertical: this.state.vertical,
      horizontal: this.state.horizontal
    };
  },

  render: function () {
    return (
      <div className="panel" style={ this.getPanelStyles() }>
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
