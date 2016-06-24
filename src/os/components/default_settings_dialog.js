var React = require('react'),

    settings = require('../settings'),
    Mixins = require('../mixins'),
    SettingsDialog = require('./settings_dialog'),
    WidgetStylesForm = require('./widget_styles_form');

var _SettingsDialog = React.createClass({
  name: settings.DEFAULT_SETTINGS_DIALOG_NAME,
  mixins: [Mixins.SettingsDialogHelper],

  getInitialState: function () {
    return {
      widgetName: null,
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

  componentDidMount: function () {
    this.open(function (widgetName, settings) {
      var callback = function () {
        this.refs.dialog.open();
      }.bind(this);

      this.setState({
        widgetName: widgetName,
        settings: settings
      }, callback);
    }.bind(this));
  },

  render: function () {
    var settings = this.state.settings;

    return (
      <SettingsDialog
        ref="dialog"
        name={ this.state.widgetName }>

        <WidgetStylesForm
          onSubmit={ this.handleSubmit }
          settings={ settings.widgetStyles }
        />
      </SettingsDialog>
    );
  }
});


module.exports = _SettingsDialog;
