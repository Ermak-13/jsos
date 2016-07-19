var _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    settings = require('./settings'),
    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events'),
    storage = require('./storage'),

    log = require('./actions/log');

var addScript = function (options) {
  options = options || {};
  log('info', sprintf('add script %s', JSON.stringify(options)));

  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');

  if (options.src) {
    script.setAttribute('src', options.src);
  }

  if (options.text) {
    log('error', 'chrome forbids script inline.');
  }

  document.body.appendChild(script);
};

var Scripts = function () {
  log('info', 'Start initializing Scripts.');

  this.list = [];
  var _this = this;

  log('info', 'Scripts - start loadin.');
  storage.get(settings.SCRIPTS_STORAGE_KEY, function (scripts) {
    _this.list = scripts || [];

    _.each(_this.list, function (script) {
      addScript(script);
    });
    AppDispatcher.updatedScripts(_this.list);

    AppDispatcher.bind(Events.installScript, function (script) {
      _this.add(script);
    });
  });
  log('info', 'Scripts - finish loading.');

  this.all = function () {
    return _this.list;
  };

  this.add = function (script) {
    _this.list.push(script);

    storage.set(settings.SCRIPTS_STORAGE_KEY, _this.list, function () {
      addScript(script);
      AppDispatcher.updatedScripts(_this.list);
    });
  };

  this.remove = function (script) {
    _this.list = _.without(_this.list, script);

    storage.set(settings.SCRIPTS_STORAGE_KEY, _this.list, function () {
      AppDispatcher.updatedScripts(_this.list);
    });
  };

  this.updated = function (callback) {
    AppDispatcher.bind(Events.updatedScripts, callback);
  };

  log('info', 'Finish initializing Scripts.');
};

var Singleton = (function () {
  var instance;

  function createInstance () {
    var instance = new Scripts();
    return instance;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    }
  };
}) ();

module.exports = Singleton.getInstance();
