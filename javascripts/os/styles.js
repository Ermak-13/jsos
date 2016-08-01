var _ = require('underscore'),

    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events'),

    download = require('./actions/download'),
    log = require('./actions/log');

var addStyle = function (options, callback) {
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');

  if (options.content) {
    style.innerHTML = options.content;
    document.body.appendChild(style);

    callback(options);
    return ;
  }

  if (options.url) {
    download(options.url, {
      success: function (content) {
        style.innerHTML = content;
        options.content = content;

        document.body.appendChild(style);
        callback(options);
      }
    });

    return ;
  }
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
    var _this = this;

    addStyle(_.clone(style), function (style) {
      _this.list.push(style);
      AppDispatcher.updatedStyles(_this.list);
    });
  };

  this.remove = function (style) {
    this.list = _.without(this.list, style);
    AppDispatcher.updatedStyles(this.list);
  };

  this.updated = function (callback) {
    AppDispatcher.bind(Events.updatedStyles, callback);
  };

  this.load = function (onReadyCallback) {
    var _this = this;

    AppDispatcher.bind(Events.installStyle, function (style) {
      _this.add(style);
    });

    AppDispatcher.bind(Events.uninstallStyle, function (style) {
      _this.remove(style);
    });

    onReadyCallback();
  };

  log('info', 'Finish initializing Styles.');
};

module.exports = Styles;
