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
    ConfigureBtn = require('./configure_btn'),
    carousel = require('./carousel');

var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper],

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
        onClick: this._openConfigurator
      },
      tooltip: tooltips[ConfigureBtn.displayName]
    });

    return shortcuts;
  },

  _createShortcut: function (shortcut, i) {
    return React.createElement('div', {
        key: i,
        className: 'tooltip-container',
        'data-toogle': 'tooltip',
        'data-title': shortcut.tooltip,
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

  getPrevShortcutsArrowStyles: function () {
    return {
      'left-vertical': settings.VERTICAL_PREV_SHORTCUTS_ARROW_STYLES,
      'right-vertical': settings.VERTICAL_PREV_SHORTCUTS_ARROW_STYLES,
      'top-horizontal': settings.HORIZONTAL_PREV_SHORTCUTS_ARROW_STYLES,
      'bottom-horizontal': settings.HORIZONTAL_PREV_SHORTCUTS_ARROW_STYLES
    }[this.getPanelKey()];
  },

  getNextShortcutsArrowStyles: function () {
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

  initTooltips: function ($panel) {
    var $tooltips = $panel.find('.tooltip-container');
    $tooltips.tooltip('destroy');

    var placement = {
      'left-vertical': 'right',
      'right-vertical': 'left',
      'top-horizontal': 'bottom',
      'bottom-horizontal': 'top'
    }[this.getPanelKey()];
    $tooltips.tooltip({ placement: placement });
  },

  initCarousel: function ($panel) {
    var type = _.find(['vertical', 'horizontal'], function (key) {
      return this.state[key];
    }.bind(this));
    carousel($panel, type);
  },

  componentDidUpdate: function () {
    var panel = ReactDOM.findDOMNode(this.refs.panel),
        $panel = $(panel);

    this.initTooltips($panel);
    this.initCarousel($panel);
  },

  componentDidMount: function () {
    var panel = ReactDOM.findDOMNode(this.refs.panel),
        $panel = $(panel);

    this.initTooltips($panel, this.getPanelKey());
    this.initCarousel($panel);
  },

  render: function () {
    return (
      <div className="panel"
        ref="panel"
        style={ this.getPanelStyles() }>

        { this.getPrevShortcutsArrowHTML() }

        <div className="shortcuts-container-wrapper">
          <div className="shortcuts-container"
            style={ this.getShortcutsContainerStyles() }>

            { this.getShortcutsHTML() }

            <div className="clearfix" />
          </div>
        </div>

        { this.getNextShortcutsArrowHTML() }

      </div>
    );
  },

  createConfigurator: function () {
    return (
      <Configurator
        name={ this.getName() }
        settings={ this.getSettings() }
        onSubmit={ this._handleConfigure }
      />
    );
  },

  getPrevShortcutsArrowHTML: function () {
    var vArrow = function () {
          return (
            <div className="arrow-up" />
          );
        } (),
        hArrow = function () {
          return (
            <div className="arrow-vafix">
              <div className="arrow-left" />
            </div>
          );
        } (),

        arrow = {
          'left-vertical': vArrow,
          'right-vertical': vArrow,
          'top-horizontal': hArrow,
          'bottom-horizontal': hArrow
        }[this.getPanelKey()];

    return (
      <div className="prev-shortcuts-arrow"
        style={ this.getPrevShortcutsArrowStyles() }>
        { arrow }
      </div>
    );
  },

  getNextShortcutsArrowHTML: function () {
    var vArrow = function () {
          return (
            <div className="arrow-down" />
          );
        } (),
        hArrow = function () {
          return (
            <div className="arrow-vafix">
              <div className="arrow-right" />
            </div>
          );
        } (),

        arrow = {
          'left-vertical': vArrow,
          'right-vertical': vArrow,
          'top-horizontal': hArrow,
          'bottom-horizontal': hArrow
        }[this.getPanelKey()];

    return (
      <div className="next-shortcuts-arrow"
        style={ this.getNextShortcutsArrowStyles() }>
        { arrow }
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
