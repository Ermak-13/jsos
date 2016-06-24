var React = require('react'),
    _ = require('underscore'),

    OS = require('os'),
    SettingsDialog = OS.SettingsDialog,
    WidgetStylesForm = OS.WidgetStylesForm,
    Mixins = OS.Mixins,

    settings = require('./widget_settings'),
    TimeConfigsForm = require('./time_configs_form'),
    TimeStylesForm = require('./time_styles_form');

var _SettingsDialog = React.createClass({
  name: settings.WIDGET_NAME,
  mixins: [Mixins.NavHelper, Mixins.SettingsDialogHelper],

  getInitialState: function () {
    return {
      tab: 'timeConfigs',
      settings: {
        widgetStyles: {},
        timeStyles: {}
      }
    };
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
              onSubmit={ this.getSubmitHandler('widgetStyles') }
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
    this.open(function (settings) {
      var callback = function () {
        this.refs.dialog.open();
      }.bind(this);

      this.setState({
        settings: settings
      }, callback);
    }.bind(this));
  },

  render: function () {
    return (
      <SettingsDialog
        ref="dialog"
        name={ this.name }>

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
