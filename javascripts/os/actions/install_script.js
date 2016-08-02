var sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),

    isUrl = require('./is_url'),
    download = require('./download'),
    log = require('./log');

var installScript = function (url) {
  log('info', sprintf('install script %s.', url));

  if (isUrl(url) && global.Settings.get('scripts_is_downloadable')) {
    installDownloadableScript(url);
  } else {
    installRemoteScript(url);
  }
};

var installDownloadableScript = function (url) {
  download(url, {
    success: function (text) {
      var script = {
        url: url,
        text: text
      };

      AppDispatcher.installScript(script);
    }
  });
};

var installRemoteScript = function (url) {
  var script = {
    url: url
  };

  AppDispatcher.installScript(script);
};

module.exports = installScript;
