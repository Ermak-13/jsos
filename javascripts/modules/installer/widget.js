var React = require('react'),
    _ = require('underscore'),
    s = require('underscore.string'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Widget = OS.Widget,

    settings = require('./settings'),
    ScriptsTab = require('./scripts_tab'),
    StylesTab = require('./styles_tab');

var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper, Mixins.NavHelper],

  getInitialState: function () {
    return {
      tab: 'scripts',

      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION
    };
  },


  _getSettings: function () {
    return {
      size: _.clone(this.state.size),
      position: _.clone(this.state.position)
    };
  },

  getTabs: function () {
    var scripts = React.createElement(ScriptsTab, {}),
        styles = React.createElement(StylesTab, {});

    return {
      scripts: {
        navText: I18n.t('installer.scripts.nav_text'),
        content: scripts
      },

      styles: {
        navText: I18n.t('installer.styles.nav_text'),
        content: styles
      }
    };
  },

  componentWillMount: function () {
    this.init();
  },

  _load: function (onLoad) {
    this.loadSettings(onLoad);
  },

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.getWidgetStyles() }>
        <Widget.DefaultHeader
          title={ s.capitalize(this.props.widgetName) }
          onMouseDownPositionBtn={ this.handleStartMoving }
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this.openConfigurator }
        />

        <Widget.Body>
          { this.getNavHTML() }

          <div style={{ marginTop: '20px' }}>
            { this.getContentHTML() }
            </div>
        </Widget.Body>
      </Widget.Widget>
    );
  }
});

module.exports = _Widget;
