var sprintf = require('sprintf-js').sprintf;

var chromeSyncStorage = {
  set: function (key, value, callback) {
    var record = {},
        wrappedCallback = function () {
          global.OS.log('info', sprintf('OS storage - set %s.', key));
          if (callback) callback();
        };

    record[key] = value;
    chrome.storage.sync.set(record, wrappedCallback);
  },

  get: function (key, callback) {
    var wrappedCallback = function (result) {
      global.OS.log('info', sprintf('OS storage - get %s.', key));
      callback(result[key]);
    };

    chrome.storage.sync.get(key, wrappedCallback);
  },

  remove: function (key) {
    var callback = function () {
      global.OS.log('info', sprintf('OS storage - remove %s.', key));
    };

    chrome.storage.sync.remove(key, callback);
  },

  clear: function () {
    callback = function () {
      global.OS.log('info', 'OS storage - clear.');
    };

    chrome.storage.sync.clear(callback);
  }
};

module.exports = chromeSyncStorage;
