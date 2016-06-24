var React = require('react'),

    OS = require('os'),
    SettingsDialog = OS.SettingsDialog,
    WidgetStylesForm = OS.WidgetStylesForm,
    Mixins = OS.Mixins,

    settings = require('./widget_settings'),
    CalendarConfigsForm = require('./calendar_configs_form');

var _SettingsDialog = React.createClass({
  name: settings.SETTINGS_DIALOG_NAME,
  mixins: [Mixins.NavHelper, Mixins.SettingsDialogHelper],

  getInitialState: function () {
    return {
      tab: 'calendarConfigs',
      settings: {
        widgetStyles: {},
        calendarStyles: {},
        monthStyles: {},
        dayStyles: {}
      }
    };
  },

  getSubmitHandler: function (tab) {
    var handlers = {
      calendarConfigs: function (settings) {
        this.update(settings);
      }.bind(this),

      widgetStyles: function (widgetStyles) {
        var settings = this.state.settings;
        settings.widgetStyles = widgetStyles;

        this.update(settings);
      }.bind(this)
    };

    return handlers[tab];
  },

  getTabs: function () {
    var settings = this.state.settings;

    return {
      calendarConfigs: {
        navText: 'Calendar Configs',
        content: function () {
          return (
            <CalendarConfigsForm
              onSubmit={ this.getSubmitHandler('calendarConfigs') }
              settings={ settings }
            />
          );
        }.bind(this) ()
      },

      widgetStyles: {
        navText: 'Widget Styles',
        content: function () {
          return (
            <WidgetStylesForm
              onSubmit={ this.getSubmitHandler('widgetStyles') }
              settings={ settings.widgetStyles }
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
