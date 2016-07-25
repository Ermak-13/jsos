var sprintf = require('sprintf-js').sprintf,
    moment = require('moment'),

    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events');

var Logger = function () {
  this.logs = [];

  this.all = function () {
    return this.logs;
  };

  this.get = function (index) {
    return this.all()[index];
  };

  var _this = this;
  AppDispatcher.bind(Events.log, function (level, message) {
    var createdAt = moment().unix();

    _this.logs.push({
      level: level,
      message: message,
      createdAt: createdAt
    });

    console.log(
      sprintf(
        '%s (%s) - %s',
        level.toUpperCase(),
        createdAt,
        message
      )
    );
  });
};

module.exports = Logger;
