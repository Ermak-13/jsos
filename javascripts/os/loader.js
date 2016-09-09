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
    Widgets = require('./widgets');

var Loader = function (options) {
  options = options || {};

  this.load = function (callback) {
    global.Logger = new Logger();
    global.Storage = new Storage(options.storageType || 'chrome.local');

    global.Settings = new Settings(options.settings || {});
    global.AppDispatcher = AppDispatcher;
    global.Events = Events;

    global.I18n = new I18n();
    global.I18n.registryDict(i18nDict);

    global.Modules = new Modules();

    global.Scripts = new Scripts();
    global.Scripts.load(function () {

      global.Styles = new Styles();
      global.Styles.load(function () {

        global.Widgets = new Widgets();
        global.Widgets.load(function () {
          callback();
        });

      });

    });
  };
};

module.exports = Loader;
