var _ = require('underscore'),
    sprintf = require('underscore.string/sprintf'),

    log = require('./log'),
    request = require('./request');

var download = function (url, callbacks, options) {
  log('info', 'OS download - begin');

  callbacks = callbacks || {};
  options = options || {};

  var errorCallbak = callbacks.errors || function (xhr) {};
  if (!_.isFunction(callbacks.done)) {
    callbacks.done = function (xhr) {
      if (xhr.status === 200) {
        log('info', 'OS download - success');
        callbacks.success(xhr.responseText);
      } else {
        log('info', sprintf('OS download - %s, error %s', url, xhr.status));
        errorCallbak(xhr);
      }
    };
  }

  request('GET', url, callbacks, options);
  log('info', 'OS download - end');
};

module.exports = download;
