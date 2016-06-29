var sprintf = require('underscore.string/sprintf'),
    log = require('./actions/log');

var storage = {
  set: function (key, value) {
    var record = {},
        callback = function () {
          var message = sprintf('OS storage - set %s', key);
          log('info', message);
        };

    record[key] = value;
    chrome.storage.local.set(record, callback);
  },

  get: function (key, callback) {
    var wrappedCallback = function (result) {
      callback(result[key]);
    };

    chrome.storage.local.get(key, wrappedCallback);
  },

  clear: function () {
    chrome.storage.local.clear();
  }
};

module.exports = storage;
