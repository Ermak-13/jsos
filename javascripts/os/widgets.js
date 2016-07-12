var _ = require('underscore'),

    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events');

var widgets = function () {
  this.list = [];

  var _this = this;
  AppDispatcher.bind(Events.initWidget, function (widget) {
    _this.list.push(widget);
  });

  this.get = function (id) {
    return _.find(_this.list, function (widget) {
      return widget.props.widgetId === id;
    });
  };

  this.where = function (callback) {
    return _.filter(_this.list, callback);
  };

  this.all = function () {
    return _this.list;
  };
};

module.exports = new widgets();
