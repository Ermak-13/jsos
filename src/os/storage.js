var sprintf = require('sprintf-js').sprintf,
    log = require('./actions/log');

var storage = {
  set: function (key, value) {
    var record = {},
        callback = function () {
          log('info', sprintf('OS storage - set %s.', key));
        };

    record[key] = value;
    chrome.storage.local.set(record, callback);
  },

  get: function (key, callback) {
    var wrappedCallback = function (result) {
      callback(result[key]);
      log('info', sprintf('OS storage - get %s.', key));
    };

    chrome.storage.local.get(key, wrappedCallback);
  },

  clear: function () {
    chrome.storage.local.clear();
  }
};

module.exports = storage;
