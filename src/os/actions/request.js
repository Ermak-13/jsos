var _ = require('underscore'),
    sprintf = require('underscore.string/sprintf'),

    log = require('./log');

var request = function (method, url, callbacks, options) {
  log('info', 'OS request - begin');

  callbacks = callbacks || {};
  options = _.extend(
    { async: true },
    _.clone(options || {})
  );

  var logReadyState = function (code) {
        log('info', sprintf('OS request - xhr ready state - %s', code));
      },

      getDefaultCallback = function (code) {
        return function (xhr) {
          logReadyState(code);
        };
      },

      readyStateOptions = {
        unset: {
          code: XMLHttpRequest.UNSET,
          callback: getDefaultCallback(XMLHttpRequest.UNSET)
        },

        opened: {
          code: XMLHttpRequest.OPENED,
          callback: getDefaultCallback(XMLHttpRequest.OPENED)
        },

        headersReceived: {
          code: XMLHttpRequest.HEADERS_RECEIVED,
          callback: getDefaultCallback(XMLHttpRequest.HEADERS_RECEIVED)
        },

        loading: {
          code: XMLHttpRequest.LOADING,
          callback: function (xhr) {
            logReadyState(XMLHttpRequest.LOADING);

            if (_.isFunction(callbacks.loading)) {
              callbacks.loading(xhr);
            }
          }
        },

        done: {
          code: XMLHttpRequest.DONE,
          callback: function (xhr) {
            logReadyState(XMLHttpRequest.DONE);

            if (_.isFunction(callbacks.done)) {
              callbacks.done(xhr);
            }
          }
        }
  };

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    _.each(readyStateOptions, function (options, state) {
      if (xhr.readyState === options.code) {
        options.callback(xhr);
      }
    });
  };

  xhr.open(
    method,
    url,
    options.async,
    options.user,
    options.password
  );
  xhr.send();

  log('info', 'OS request - end');
};

module.exports = request;
