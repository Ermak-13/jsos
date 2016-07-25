var _ = require('underscore'),
    settings = require('./settings'),
    storage = require('./storage'),
    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events'),

    log = require('./actions/log');

var Widgets = function (onReadyCallback) {
  log('info', 'Start initializing Widgets.');

  this.widgets = [];
  this.nextWidgetId = 0;

  this.all = function () {
    return this.widgets;
  };

  this.add = function (name) {
    var widget = {
      widgetName: name,
      widgetId: this.nextWidgetId
    };

    this.nextWidgetId = this.nextWidgetId + 1;
    this.widgets.push(widget);

    var _this = this;
    storage.set(settings.WIDGETS_STORAGE_KEY, this.widgets, function () {
      AppDispatcher.updatedWidgets(_this.widgets);
    });
  };

  this.remove = function (widgetId) {
    var widgets = _.filter(this.widgets, function (widget) {
      return widget.widgetId !== widgetId;
    });

    this.widgets = widgets;
    var _this = this;
    storage.set(settings.WIDGETS_STORAGE_KEY, this.widgets, function () {
      AppDispatcher.updatedWidgets(_this.widgets);
    });
  };

  this.updated = function (callback) {
    AppDispatcher.bind(Events.updatedWidgets, callback);
  };

  var _this = this;
  storage.get(settings.WIDGETS_STORAGE_KEY, function (widgets) {
    _this.widgets = widgets || _this.widgets;

    var ids = _.map(_this.widgets, function (widget) {
          return widget.widgetId;
        }),
        maxWidgetId = _.isEmpty(ids) ? 0 : _.max(ids),
        nextWidgetId = maxWidgetId + 1;

    _this.nextWidgetId = nextWidgetId;
    AppDispatcher.updatedWidgets(_this.widgets);

    AppDispatcher.bind(Events.addWidget, function (widget) {
      _this.add(widget);
    });

    AppDispatcher.bind(Events.removeWidget, function (widget) {
      _this.remove(widget);
    });

    onReadyCallback();
  });

  log('info', 'Finish initializing Widgets.');
};

module.exports = Widgets;
