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
  init: function (onLoad) {
    if (this._init) return this._init();

    this.load(function () {
      if (onLoad) onLoad();
      global.OS.log('info', sprintf('Widget %s - initalized.', this.getName()));

      AppDispatcher.initWidget(this);
    }.bind(this));
  },

  load: function (onLoad) {
    if (this._load) return this._load(onLoad);

    this.loadData(function () {
      this.loadSettings(onLoad);
    }.bind(this));
  },

  save: function () {
    if (this._save) return this._save();

    this.saveData();
    this.saveSettings();
  },

  close: function () {
    if (this._close) return this._close();

    global.Storage.remove(this.getSettingsStorageKey());
    AppDispatcher.removeWidget(this.props.widgetId);
  },

  getName: function () {
    if (this._getName) return this._getName();

    return this.props.name || this.props.widgetName;
  }
};

WidgetHelper = _.extend(WidgetHelper, WidgetStylesHelper);
WidgetHelper = _.extend(WidgetHelper, PositionHelper);
WidgetHelper = _.extend(WidgetHelper, SettingsManager);
WidgetHelper = _.extend(WidgetHelper, DataManager);
WidgetHelper = _.extend(WidgetHelper, ConfiguratorOpener);

module.exports = WidgetHelper;
