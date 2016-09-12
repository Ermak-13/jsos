var Settings = require('./settings'),
    Logger = require('./logger'),
    Storage = require('./storage'),
    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events'),
    I18n = require('./i18n'),
    i18nDict = require('./locales'),
    Modules = require('./modules'),
    Scripts = require('./scripts'),
    Styles = require('./styles'),
    Widgets = require('./widgets'),
    Migrations = require('./migrations');

var DEFAULT_STORAGE_TYPE = 'chrome.storage.sync',
    SETTINGS_STORAGE_KEY = 'settings';

var Loader = function (options) {
  options = options || {};

  this.load = function (callback) {
    global.Logger = new Logger();
    global.Storage = new Storage(options.storageType || DEFAULT_STORAGE_TYPE);

    global.AppDispatcher = AppDispatcher;
    global.Events = Events;

    global.Storage.get(SETTINGS_STORAGE_KEY, function (settings) {
      global.Settings = new Settings(settings || options.settings || {});

      AppDispatcher.bind(Events.updatedSettings, function (settings) {
        global.Storage.set(SETTINGS_STORAGE_KEY, settings);
      });

      global.I18n = new I18n();
      global.I18n.init({
        lang: global.Settings.get('lang'),
        dictionary: i18nDict
      });

      global.Modules = new Modules();
      global.Scripts = new Scripts();

      global.Scripts.load(function () {
        global.Styles = new Styles();
        global.Styles.load(function () {
          global.Widgets = new Widgets();
          global.Widgets.load(function () {
            global.Migrations = new Migrations();
            global.Migrations.run();

            callback();
          });
        });
      });

    });
  };
};

module.exports = Loader;
