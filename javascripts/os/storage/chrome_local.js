var sprintf = require('sprintf-js').sprintf;

var chromeLocalStorage = {
  set: function (key, value, callback) {
    var record = {},
        wrappedCallback = function () {
          global.OS.log('info', sprintf('OS storage - set %s.', key));
          if (callback) callback();
        };

    record[key] = value;
    chrome.storage.local.set(record, wrappedCallback);
  },

  get: function (key, callback) {
    var wrappedCallback = function (result) {
      global.OS.log('info', sprintf('OS storage - get %s.', key));
      callback(result[key]);
    };

    chrome.storage.local.get(key, wrappedCallback);
  },

  remove: function (key) {
    var callback = function () {
      global.OS.log('info', sprintf('OS storage - remove %s.', key));
    };

    chrome.storage.local.remove(key, callback);
  },

  clear: function () {
    callback = function () {
      global.OS.log('info', 'OS storage - clear.');
    };

    chrome.storage.local.clear(callback);
  }
};

module.exports = chromeLocalStorage;
