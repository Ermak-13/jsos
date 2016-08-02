var sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),

    isUrl = require('./is_url'),
    download = require('./download'),
    log = require('./log');

var installStyle = function (url) {
  log('info', sprintf('installStyle %s.', url));
  if (isUrl(url) && global.Settings.get('styles_is_downloadable')) {
    installDownloadableStyle(url);
  } else {
    installRemoteStyle(url);
  }
};

var installDownloadableStyle = function (url) {
  download(url, {
    success: function (text) {
      var style = {
        url: url,
        text: text
      };

      AppDispatcher.installStyle(style);
    }
  });
};

var installRemoteStyle = function (url) {
  // TODO
};

module.exports = installStyle;
