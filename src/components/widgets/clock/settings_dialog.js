var React = require('react'),
    _ = require('underscore'),

    OS = require('os'),
    AppDispatcher = OS.AppDispatcher,
    SettingsDialog = OS.SettingsDialog,
    WidgetStylesForm = OS.WidgetStylesForm,

    widgetSettings = require('./widget_settings'),
    TimeConfigsForm = require('./time_configs_form'),
    TimeStylesForm = require('./time_styles_form');

var _SettingsDialog = React.createClass({
  getInitialState: function () {
    return {
      tab: 'timeConfigs',
      settings: {
        widgetStyles: {},
        timeStyles: {}
      }
    };
  },

  handleNavTab: function (tab) {
    this.setState({ tab: tab });
  },

  save: function () {
    AppDispatcher.trigger(
      widgetSettings.SAVE_SETTINGS_EVENT,
      this.state.settings
    );
  },

  getTabs: function () {
    var settings = this.state.settings,
        handlers = {
          timeConfigs: function (settings) {
            this.updateSettings(settings);
          }.bind(this),

          widgetStyles: function(widgetStyles) {
            var settings = this.state.settings;
            settings.widgetStyles = widgetStyles;

            this.updateSettings(settings);
          }.bind(this),

          timeStyles: function (timeStyles) {
            var settings = this.state.settings;
            settings.timeStyles = timeStyles;
            console.log(settings);

            this.updateSettings(settings);
          }.bind(this)
        };

    return {
      timeConfigs: {
        navText: 'Time Configs',
        content: function () {
          return (
            <TimeConfigsForm
              onSubmit={ handlers.timeConfigs }
              settings={ settings }
            />
          );
        }.bind(this) (),
      },

      widgetStyles: {
        navText: 'Widgets Styles',
        content: function () {
          return (
            <WidgetStylesForm
              onSubmit={ handlers.widgetStyles }
              settings={ settings.widgetStyles }
            />
          );
        }.bind(this) ()
      },

      timeStyles: {
        navText: 'Time Styles',
        content: function () {
          return (
            <TimeStylesForm
              onSubmit={ handlers.timeStyles }
              settings={ settings.timeStyles }
            />
          );
        }.bind(this) ()
      }
    };
  },

  isActive: function (tab) {
    return tab === this.state.tab;
  },

  componentDidMount: function () {
    AppDispatcher.bind(widgetSettings.OPEN_SETTINGS_DIALOG_EVENT, function (settings) {
      this.refs.dialog.open();

      this.setState({ settings: settings });
    }.bind(this));
  },

  render: function () {
    return (
      <SettingsDialog
        ref="dialog"
        name="clock">

        { this.getNavHTML() }

        <div className="row" style={{ marginTop: '20px' }}>
          <div className="col-md-10 col-md-offset-1">
            { this.getContentHTML() }
          </div>
        </div>
      </SettingsDialog>
    );
  },

  getNavHTML: function () {
    var liHTML = _.map(this.getTabs(), function (options, tab) {
      var className = this.isActive(tab) ? 'active' : '';

      return (
        <li key={ tab } className={ className }>
          <a href="#" onClick={ this.handleNavTab.bind(this, tab) }>
            { options.navText }
          </a>
        </li>
      );
    }.bind(this));

    return (
      <ul className="nav nav-tabs mini-nav">
        { liHTML }
      </ul>
    );
  },

  getContentHTML: function () {
    return this.getTabs()[this.state.tab].content;
  }
});

module.exports = _SettingsDialog;
