var _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),

    WidgetStylesHelper = require('./widget_styles_helper'),
    PositionHelper = require('./position_helper'),
    SettingsManager = require('./settings_manager'),
    DataManager = require('./data_manager'),
    ConfiguratorOpener = require('./configurator_opener');

var WidgetHelper = {
  init: function () {
    this.load();
    AppDispatcher.initWidget(this);
  },

  load: function () {
    this.loadData();
    this.loadSettings();
  },

  save: function () {
    this.saveData();
    this.saveSettings();
  },

  close: function () {
    global.Storage.remove(this.getSettingsStorageKey());
    AppDispatcher.removeWidget(this.props.widgetId);
  },

  getName: function () {
    return this.props.name || this.props.widgetName;
  }
};

WidgetHelper = _.extend(WidgetHelper, WidgetStylesHelper);
WidgetHelper = _.extend(WidgetHelper, PositionHelper);
WidgetHelper = _.extend(WidgetHelper, SettingsManager);
WidgetHelper = _.extend(WidgetHelper, DataManager);
WidgetHelper = _.extend(WidgetHelper, ConfiguratorOpener);

module.exports = WidgetHelper;
