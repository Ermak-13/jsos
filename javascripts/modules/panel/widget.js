var React = require('react'),
    ReactDOM = require('react-dom'),
    _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    OS = require('os'),
    Mixins = OS.Mixins,
    Widget = OS.Widget,
    Link = OS.Link,

    settings = require('./settings'),
    Configurator = require('./configurator'),
    DesktopConfiguratorShortcut = require('./desktop_configurator_shortcut'),
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

      shortcuts: this.getShortcuts()
    };
  },

  getShortcuts: function () {
    var shortcuts = [];

    var tooltips = {
      'DesktopConfiguratorShortcut': 'Desktop Configurator',
      'BookmarksShortcut': 'Chrome Bookmarks',
      'HistoryShortcut': 'Chrome History',
      'DownloadsShortcut': 'Chrome Downloads',
      'ConfigureBtn': 'Panel Configurator'
    };

    _.each([
      DesktopConfiguratorShortcut,
      BookmarksShortcut,
      HistoryShortcut,
      DownloadsShortcut
    ], function (ReactClass) {
      shortcuts.push({
        ReactClass: ReactClass,
        props: {
          key: shortcuts.length,
          className: 'shortcut'
        },
        tooltip: tooltips[ReactClass.displayName]
      });
    });

    _.each(global.Modules.all(), function (module, name) {
      if (name !== 'Panel') {
        var ReactClass = module.Shortcut || DefaultShortcut;
        shortcuts.push({
          ReactClass: ReactClass,
          props: {
            key: shortcuts.length,
            className: 'shortcut',
            onClick: function () {
              OS.addWidget(name);
            }
          },
          tooltip: name
        });
      }
    });

    shortcuts.push({
      ReactClass: ConfigureBtn,
      props: {
        key: shortcuts.length,
        className: 'shortcut',
        onClick: this.openConfigurator
      },
      tooltip: tooltips[ConfigureBtn.displayName]
    });

    return shortcuts;
  },

  _createShortcut: function (shortcut, i) {
    var placement = {
      'left-vertical': 'right',
      'right-vertical': 'left',
      'top-horizontal': 'bottom',
      'bottom-horizontal': 'top'
    }[this.getPanelKey()];

    return React.createElement('div', {
        key: i,
        className: 'tooltip-container',
        'data-toogle': 'tooltip',
        'data-title': shortcut.tooltip,
        'data-placement': placement,
        'data-container': 'body'
      }, React.createElement(shortcut.ReactClass, shortcut.props)
    );
  },

  getPanelStyles: function () {
    return {
      'left-vertical': settings.LEFT_VERTICAL_PANEL_STYLES,
      'right-vertical': settings.RIGHT_VERTICAL_PANEL_STYLES,
      'top-horizontal': settings.TOP_HORIZONTAL_PANEL_STYLES,
      'bottom-horizontal': settings.BOTTOM_HORIZONTAL_PANEL_STYLES
    }[this.getPanelKey()];
  },

  getPrevShortcutsArrow: function () {
    return {
      'left-vertical': settings.VERTICAL_PREV_SHORTCUTS_ARROW_STYLES,
      'right-vertical': settings.VERTICAL_PREV_SHORTCUTS_ARROW_STYLES,
      'top-horizontal': settings.HORIZONTAL_PREV_SHORTCUTS_ARROW_STYLES,
      'bottom-horizontal': settings.HORIZONTAL_PREV_SHORTCUTS_ARROW_STYLES
    }[this.getPanelKey()];
  },

  getNextShortcutsArrow: function () {
    return {
      'left-vertical': settings.VERTICAL_NEXT_SHORTCUTS_ARROW_STYLES,
      'right-vertical': settings.VERTICAL_NEXT_SHORTCUTS_ARROW_STYLES,
      'top-horizontal': settings.HORIZONTAL_NEXT_SHORTCUTS_ARROW_STYLES,
      'bottom-horizontal': settings.HORIZONTAL_NEXT_SHORTCUTS_ARROW_STYLES
    }[this.getPanelKey()];
  },

  getShortcutsContainerStyles: function () {
    return {
      'left-vertical': settings.VERTICAL_SHORTCUTS_CONTAINER_STYLES,
      'right-vertical': settings.VERTICAL_SHORTCUTS_CONTAINER_STYLES,
      'top-horizontal': settings.HORIZONTAL_SHORTCUTS_CONTAINER_STYLES,
      'bottom-horizontal': settings.HORIZONTAL_SHORTCUTS_CONTAINER_STYLES
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

    global.Modules.updated(function (modules) {
      this.setState({
        shortcuts: this.getShortcuts()
      });
    }.bind(this));
  },

  componentDidMount: function () {
    var panel = ReactDOM.findDOMNode(this.refs.panel),
        $panel = $(panel);

    $panel.find('.prev-shortcuts-arrow').on('click', function () {
      $panel.find('.shortcuts-container').animate(
        settings.PREV_SHORTCUTS_ARROW_ANIMATE_PROPS[this.getPanelKey()],
        settings.SHORTCUTS_ARROW_ANIMATE_DURATION
      );
    }.bind(this));

    $panel.find('.next-shortcuts-arrow').on('click', function () {
      $panel.find('.shortcuts-container').animate(
        settings.NEXT_SHORTCUTS_ARROW_ANIMATE_PROPS[this.getPanelKey()],
        settings.SHORTCUTS_ARROW_ANIMATE_DURATION
      );
    }.bind(this));

    $panel.find('.tooltip-container').tooltip();
  },

  render: function () {
    return (
      <div className="panel"
        ref="panel"
        style={ this.getPanelStyles() }>

        <div className="prev-shortcuts-arrow"
          style={ this.getPrevShortcutsArrow() }>

          <div className="arrow-up" />
        </div>

        <div className="shortcuts-container-wrapper">

          <div className="shortcuts-container"
            style={ this.getShortcutsContainerStyles() }>

            { this.getShortcutsHTML() }
          </div>
        </div>

        <div className="next-shortcuts-arrow"
          style={ this.getNextShortcutsArrow() }>

          <div className="arrow-down" />
        </div>

        <Configurator
          ref={ this.props.configuratorRefName }
          name={ this.props.name }
          settings={ this.getSettings() }
          onSubmit={ this.handleConfigure }
        />
      </div>
    );
  },

  getShortcutsHTML: function () {
    return _.map(this.state.shortcuts, function (shortcut, i) {
      return this._createShortcut(shortcut, i);
    }.bind(this));
  }
});

module.exports = _Widget;
