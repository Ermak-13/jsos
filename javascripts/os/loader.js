var Logger = require('./logger');

var Loader = function () {
  this.load = function (callback) {
    new Logger();

    callback();
  };
};

module.exports = Loader;
