var AppDispatcher= require('../app_dispatcher');

var removeWidget = function (widgetId) {
  AppDispatcher.removeWidget(widgetId);
};

module.exports = removeWidget;
