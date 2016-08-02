var _ = require('underscore'),

    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events'),

    download = require('./actions/download'),
    log = require('./actions/log');

var addStyle = function (options) {
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');

  if (options.text) {
    style.innerHTML = options.text;
    document.body.appendChild(style);

    return ;
  }

  return ;
};

var Styles = function () {
  log('info', 'Start initializing Styles.');

  this.list = [];

  this.all = function () {
    return this.list;
  };

  this.get = function (index) {
    return this.all()[index];
  };

  this.add = function (style) {
    this.list.push(style);
    addStyle(style);

    var _this = this;
    global.Storage.set(global.Settings.get('styles_storage_key'), this.list, function () {
      AppDispatcher.updatedStyles(_this.list);
    });
  };

  this.remove = function (style) {
    this.list = _.without(this.list, style);

    var _this = this;
    global.Storage.set(global.Settings.get('styles_storage_key'), this.list, function () {
      AppDispatcher.updatedStyles(_this.list);
    });
  };

  this.updated = function (callback) {
    AppDispatcher.bind(Events.updatedStyles, callback);
  };

  this.load = function (onReadyCallback) {
    var _this = this;
    global.Storage.get(global.Settings.get('styles_storage_key'), function (styles) {
      _this.list = styles || _this.list;
      _.each(_this.list, function (style) {
        addStyle(style);
      });
      AppDispatcher.updatedStyles(_this.list);

      AppDispatcher.bind(Events.installStyle, function (style) {
        _this.add(style);
      });

      AppDispatcher.bind(Events.uninstallStyle, function (style) {
        _this.remove(style);
      });

      onReadyCallback();
    });
  };

  log('info', 'Finish initializing Styles.');
};

module.exports = Styles;
