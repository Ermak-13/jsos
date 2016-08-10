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

var Loader = function () {
  this.load = function (callback) {
    global.Settings = new Settings(global.settings || {});
    global.Logger = new Logger();
    global.Storage = new Storage(global.storageType || 'chrome.local');

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
