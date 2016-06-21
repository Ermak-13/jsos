var React = require('react'),
    _ = require('underscore'),

    OS = require('os'),
    AppDispatcher = OS.AppDispatcher,
    Events = OS.Events,
    SettingsDialog = OS.SettingsDialog,
    WidgetStylesForm = OS.WidgetStylesForm,
    Mixins = OS.Mixins,

    widgetSettings = require('./widget_settings'),
    TimeConfigsForm = require('./time_configs_form'),
    TimeStylesForm = require('./time_styles_form');

var _SettingsDialog = React.createClass({
  mixins: [Mixins.NavHelper],

  getInitialState: function () {
    return {
      tab: 'timeConfigs',
      settings: {
        widgetStyles: {},
        timeStyles: {}
      }
    };
  },

  update: function (settings) {
    this.setState(
      { settings: settings },
      function () { this.save(); }.bind(this)
    );
  },

  save: function () {
    var event = Events.saveSettings(widgetSettings.WIDGET_NAME);
    AppDispatcher.trigger(event, this.state.settings);
  },

  getSubmitHandler: function (tab) {
    var handlers = {
      timeConfigs: function (settings) {
        this.update(settings);
      }.bind(this),

      widgetStyles: function(widgetStyles) {
        var settings = this.state.settings;
        settings.widgetStyles = widgetStyles;

        this.update(settings);
      }.bind(this),

      timeStyles: function (timeStyles) {
        var settings = this.state.settings;
        settings.timeStyles = timeStyles;

        this.update(settings);
      }.bind(this)
    };

    return handlers[tab];
  },

  getTabs: function () {
    var settings = this.state.settings;

    return {
      timeConfigs: {
        navText: 'Time Configs',
        content: function () {
          return (
            <TimeConfigsForm
              onSubmit={ this.getSubmitHandler('timeConfigs') }
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
              onSubmit={ this.getSubmitHandler('timeConfigs') }
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
              onSubmit={ this.getSubmitHandler('timeStyles') }
              settings={ settings.timeStyles }
            />
          );
        }.bind(this) ()
      }
    };
  },

  componentDidMount: function () {
    var event = Events.openSettingsDialog(widgetSettings.WIDGET_NAME);

    AppDispatcher.bind(event, function (settings) {
      this.setState({ settings: settings }, function () {
        this.refs.dialog.open();
      }.bind(this));
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
  }
});

module.exports = _SettingsDialog;
