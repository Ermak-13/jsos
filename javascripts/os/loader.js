var Settings = require('./settings'),
    Logger = require('./logger'),
    Storage = require('./_storage'),
    Modules = require('./modules'),
    Scripts = require('./scripts'),
    Widgets = require('./widgets');

var Loader = function () {
  this.load = function (callback) {
    global.Settings = new Settings({});
    global.Logger = new Logger();
    global.Storage = new Storage('chrome.local');

    global.Modules = new Modules(function () {
      global.Scripts = new Scripts(function () {
        global.Widgets = new Widgets(function () {
          callback();
        });
      });
    });
  };
};

module.exports = Loader;
