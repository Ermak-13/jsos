var AppDispatcher = require('../app_dispatcher');

var log = function (level, message) {
  AppDispatcher.log(level.toLowerCase(), message);
};

module.exports = log;
