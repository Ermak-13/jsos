var _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),
    log = require('../actions/log'),

    WidgetStylesHelper = require('./widget_styles_helper'),
    PositionHelper = require('./position_helper'),
    SettingsManager = require('./settings_manager'),
    DataManager = require('./data_manager');

var WidgetHelper = {

  close: function () {
    global.Storage.remove(this.getSettingsStorageKey());
    AppDispatcher.removeWidget(this.props.widgetId);
  },

  openConfigurator: function () {
    var refName = this.props.configuratorRefName,
        ref = this.refs[refName];

    ref.open();
  },

  handleConfigure: function (settings) {
    var setSettings = this.setSettings || this._setSettings;
    setSettings(settings, this.saveSettings);
  },

  init: function () {
    this.load();
    AppDispatcher.initWidget(this);
  },

  getName: function () {
    return this.props.name || this.props.widgetName || '';
  },

  getConfiguratorRefName: function () {
    return this.props.configuratorRefName || 'configurator';
  },

  load: function () {
    this.loadData();
    this.loadSettings();
  },

  save: function () {
    this.saveData();
    this.saveSettings();
  }
};

WidgetHelper = _.extend(WidgetHelper, WidgetStylesHelper);
WidgetHelper = _.extend(WidgetHelper, PositionHelper);
WidgetHelper = _.extend(WidgetHelper, SettingsManager);
WidgetHelper = _.extend(WidgetHelper, DataManager);

module.exports = WidgetHelper;
