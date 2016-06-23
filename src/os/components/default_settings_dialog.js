var React = require('react'),

    settings = require('../settings'),
    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),
    Mixins = require('../mixins'),
    SettingsDialog = require('./settings_dialog'),
    WidgetStylesForm = require('./widget_styles_form');

var _SettingsDialog = React.createClass({
  name: settings.DEFAULT_SETTINGS_DIALOG_NAME,
  mixins: [Mixins.SettingsDialogHelper],

  getInitialState: function () {
    return {
      name: null,
      settings: {
        widgetStyles: {}
      }
    };
  },

  handleSubmit: function (widgetStyles) {
    var settings = this.state.settings;
    settings.widgetStyles = widgetStyles;

    this.update(settings);
  },

  open: function () {
    this.refs.dialog.open();
  },

  componentDidMount: function () {
    var event = Events.openSettingsDialog(this.name);
    AppDispatcher.bind(event, function (widgetName, settings) {
      this.setState({
        name: widgetName,
        settings: settings
      }, function () {
        this.open();
      });
    }.bind(this));
  },

  render: function () {
    var settings = this.state.settings;

    return (
      <SettingsDialog
        ref="dialog"
        name={ this.state.name }>

        <WidgetStylesForm
          onSubmit={ this.handleSubmit }
          settings={ settings.widgetStyles }
        />
      </SettingsDialog>
    );
  }
});


module.exports = _SettingsDialog;
