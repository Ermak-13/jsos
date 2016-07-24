var Logger = require('./logger'),
    Modules = require('./modules'),
    Scripts = require('./scripts');

var Loader = function () {
  this.load = function (callback) {
    new Logger();

    global.Modules = new Modules(function () {
      global.Scripts = new Scripts();
      callback();
    });
  };
};

module.exports = Loader;
