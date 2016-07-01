var NavHelper = require('./mixins/nav_helper'),
    WidgetHelper = require('./mixins/widget_helper'),
    ConfiguratorHelper = require('./mixins/configurator_helper');

var Mixins = {
  NavHelper: NavHelper,
  WidgetHelper: WidgetHelper,
  ConfiguratorHelper: ConfiguratorHelper
};

module.exports = Mixins;
