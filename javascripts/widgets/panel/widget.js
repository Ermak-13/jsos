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
    DownloadsShortcut = require('./downloads_shortcut'),
    DefaultShortcut = require('./default_shortcut'),
    ConfigureBtn = require('./configure_btn');

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

      shortcuts: this.getDefaultShortcuts()
    };
  },

  getDefaultShortcuts: function () {
    var shortcuts = [];

    _.each([
      BookmarksShortcut,
      HistoryShortcut,
      DownloadsShortcut
    ], function (ShortcutClass) {
      shortcuts.push(
        React.createElement(ShortcutClass, {
          key: shortcuts.length,
          className: 'shortcut'
        })
      );
    });

    _.each(global.Widgets, function (Widget, widgetName) {
      if (widgetName !== 'Panel') {
        var ShortcutClass = Widget.Shortcut || DefaultShortcut;
        shortcuts.push(
          React.createElement(ShortcutClass, {
            key: shortcuts.length,
            className: 'shortcut',
            onClick: function () {
              OS.addWidget(widgetName);
            }
          })
        );
      }
    });

    shortcuts.push(React.createElement(ConfigureBtn, {
      key: shortcuts.length,
      className: 'shortcut',
      onClick: this.openConfigurator
    }));

    return shortcuts;
  },

  getPanelStyles: function () {
    return {
      'left-vertical': settings.LEFT_VERTICAL_PANEL_STYLES,
      'right-vertical': settings.RIGHT_VERTICAL_PANEL_STYLES,
      'top-horizontal': settings.TOP_HORIZONTAL_PANEL_STYLES,
      'bottom-horizontal': settings.BOTTOM_HORIZONTAL_PANEL_STYLES
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

  componentWillMount: function () {
    this.init();
  },

  render: function () {
    return (
      <div className="panel" style={ this.getPanelStyles() }>
        { this.state.shortcuts }

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
