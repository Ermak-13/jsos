var Logger = require('./logger'),
    Modules = require('./modules');

var Loader = function () {
  this.load = function (callback) {
    new Logger();
    global.Modules = new Modules(function () {
      callback();
    });
  };
};

module.exports = Loader;
