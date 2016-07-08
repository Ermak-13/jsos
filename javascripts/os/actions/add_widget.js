var AppDispatcher = require('../app_dispatcher');

var addWidget = function (WidgetClass) {
  AppDispatcher.addWidget(WidgetClass);
};

module.exports = addWidget;
