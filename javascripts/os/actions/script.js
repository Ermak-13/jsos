var sprintf = require('sprintf-js').sprintf,
    AppDispatcher = require('../app_dispatcher'),

    log = require('./log');

var addScript = function (options) {
  options = options || {};
  log('info', sprintf('add script %s', options));

  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');

  if (options.src) {
    script.setAttribute('src', options.src);
  }

  if (options.text) {
    log('error', 'chrome forbids script inline.');
  }

  document.body.appendChild(script);
};

var installScript = function (url) {
  log('info', sprintf('install script %s', url));

  var obj = {
    src: url
  };

  AppDispatcher.installScript(obj);
};

module.exports = {
  install: installScript,
  add: addScript
};
