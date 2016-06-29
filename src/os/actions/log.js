var sprintf = require('underscore.string/sprintf');

var log = function (level, message) {
  var result = sprintf(
    '%s: %s',
    level.toUpperCase(),
    message
  );

  console.log(result);
};

module.exports = log;
