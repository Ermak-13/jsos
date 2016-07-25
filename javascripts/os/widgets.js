var _ = require('underscore'),
    storage = require('./storage'),
    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events'),

    log = require('./actions/log');

var Widgets = function (onReadyCallback) {
  log('info', 'Start initializing Widgets.');

  this.widgets = [];
  this.instances = [];
  this.nextWidgetId = 0;

  this.all = function () {
    return this.widgets;
  };

  this.get = function (widgetId) {
    var widget = _.filter(this.widgets, function (widget) {
      return widget.widgetId === widgetId;
    });

    return _.first(widget);
  };

  this.add = function (name) {
    var widget = {
      widgetName: name,
      widgetId: this.nextWidgetId
    };

    this.nextWidgetId = this.nextWidgetId + 1;
    this.widgets.push(widget);

    var _this = this;
    storage.set(global.Settings.get('widgets_storage_key'), this.widgets, function () {
      AppDispatcher.updatedWidgets(_this.widgets);
    });
  };

  this.remove = function (widgetId) {
    var widgets = _.filter(this.widgets, function (widget) {
      return widget.widgetId !== widgetId;
    });

    this.widgets = widgets;
    var _this = this;
    storage.set(global.Settings.get('widgets_storage_key'), this.widgets, function () {
      AppDispatcher.updatedWidgets(_this.widgets);
    });
  };

  this.updated = function (callback) {
    AppDispatcher.bind(Events.updatedWidgets, callback);
  };

  this.getInstance = function (widgetId) {
    var instance = _.filter(this.instances, function (instance) {
      return instance.props.widgetId === widgetId;
    });

    return _.first(instance);
  };

  var _this = this;
  storage.get(global.Settings.get('widgets_storage_key'), function (widgets) {
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

    AppDispatcher.bind(Events.initWidget, function (instance) {
      _this.instances.push(instance);
    });

    onReadyCallback();
  });

  log('info', 'Finish initializing Widgets.');
};

module.exports = Widgets;
