var chromeLocalStorage = require('./chrome_local'),
    chromeSyncStorage = require('./chrome_sync'),
    localStorage = require('./local_storage');

var Storage = function (type) {
  var storage = {
    'chrome.storage.local': chromeLocalStorage,
    'chrome.storage.sync': chromeSyncStorage,
    'localStorage': localStorage
  }[type];

  this.set = function (key, value, callback) {
    storage.set(key, value, callback);
  };

  this.get = function (key, callback) {
    storage.get(key, callback);
  };

  this.remove = function (key) {
    storage.remove(key);
  };

  this.clear = function () {
    storage.clear();
  };
};

module.exports = Storage;
