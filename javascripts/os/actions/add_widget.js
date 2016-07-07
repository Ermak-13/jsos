var AppDispatcher = require('../app_dispatcher');

var addWidget = function (widget) {
  AppDispatcher.addWidget(widget);
};

module.exports = addWidget;
