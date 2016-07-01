var NavHelper = require('./mixins/nav_helper'),
    SettingsDialogHelper = require('./mixins/settings_dialog_helper'),
    WidgetHelper = require('./mixins/widget_helper'),
    ConfiguratorHelper = require('./mixins/configurator_helper');

var Mixins = {
  NavHelper: NavHelper,
  SettingsDialogHelper: SettingsDialogHelper,
  WidgetHelper: WidgetHelper,
  ConfiguratorHelper: ConfiguratorHelper
};

module.exports = Mixins;
