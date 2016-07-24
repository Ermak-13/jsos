var Logger = require('./logger'),
    Modules = require('./modules');

var Loader = function () {
  this.load = function (callback) {
    new Logger();

    callback();
  };
};

module.exports = Loader;
