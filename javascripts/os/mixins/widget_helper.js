var _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),
    log = require('../actions/log'),

    WidgetStylesHelper = require('./widget_styles_helper'),
    PositionHelper = require('./position_helper'),
    SettingsManager = require('./settings_manager');

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
  },

  loadData: function () {
    global.Storage.get(
      this.getDataStorageKey(),
      function (data) {
        if (data) {
          var setData = this.setData  || this._setData;
          setData(data);
        }
      }.bind(this)
    );
  },

  _setData: function (data, callback) {
    this.setState(data, callback);
  },

  saveData: function () {
    var getData = this.getData || function () {
      return {};
    };

    global.Storage.set(
      this.getDataStorageKey(),
      getData()
    );
  },

  getDataStorageKey: function () {
    return sprintf(
      global.Settings.get('widget_data_storage_key'),
      { name: this.props.widgetName }
    );
  }
};

WidgetHelper = _.extend(WidgetHelper, WidgetStylesHelper);
WidgetHelper = _.extend(WidgetHelper, PositionHelper);
WidgetHelper = _.extend(WidgetHelper, SettingsManager);

module.exports = WidgetHelper;
