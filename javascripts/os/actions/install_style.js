var sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),

    isUrl = require('./is_url'),
    log = require('./log');

var installStyle = function (url) {
  if (!isUrl(url)) {
    log('warning', 'installStyle - argument is not url.');
  }

  log('info', sprintf('installStyle %s.', url));
  var style = {
    url: url
  };
  AppDispatcher.installStyle(style);
};

module.exports = installStyle;
