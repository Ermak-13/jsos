var sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events');

var Logger = function () {
  AppDispatcher.bind(Events.log, function (level, message) {
    console.log(
      sprintf(
        '%s - %s',
        level.toUpperCase(),
        message
      )
    );
  });
};

module.exports = Logger;
