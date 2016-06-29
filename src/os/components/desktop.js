var React = require('react'),
    DefaultSettingsDialog = require('./default_settings_dialog');

var Desktop = React.createClass({
  getWidgets: function () {
    var Widgets = _.map(this.props.modules, function (module) {
      return module.Widget;
    });

    return Widgets;
  },

  getSettingsDialogs: function () {
    var SettingsDialogs = _.map(this.props.modules, function (module) {
      return module.SettingsDialog;
    });

    SettingsDialogs = _.filter(SettingsDialogs, function (SettingsDialog) {
      return !_.isEmpty(SettingsDialog);
    });
    SettingsDialogs.unshift(DefaultSettingsDialog);
    
    return SettingsDialogs;
  },

  render: function () {
    return (
      <div id="desktop">
        <div id="widgets-container">
          { this.getWidgetsHTML() }
        </div>

        <div id="settings-dialogs-containe">
          { this.getSettingsDialogHTML() }
        </div>
      </div>
    );
  },

  getWidgetsHTML: function () {
    var WidgetsHTML = _.map(this.getWidgets(), function (Widget) {
      return React.createElement(Widget);
    });

    return WidgetsHTML;
  },

  getSettingsDialogHTML: function () {
    var SettingsDialogsHTML = _.map(this.getSettingsDialogs(), function (SettingsDialog) {
      return React.createElement(SettingsDialog);
    });

    return SettingsDialogsHTML;
  }
});

module.exports = Desktop;
