var sprintf = require('sprintf-js').sprintf,
    globalSettings = require('./settings'),
    log = require('./actions/log');

var chromeLocalStorage = {
  set: function (key, value, callback) {
    var record = {};
    callback = callback || function () {
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

  remove: function (key) {
    var callback = function () {
      log('info', sprintf('OS storage - remove %s.', key));
    };

    chrome.storage.local.remove(key, callback);
  },

  clear: function () {
    chrome.storage.local.clear();
    log('info', 'OS storage - clear.');
  }
};

var localStorage = {
  set: function (key, value, callback) {
    localStorage.setItem(key, value);

    callback = callback || function () {
      log('info', sprintf('OS storage - set %s.', key));
    };
    callback();
  },

  get: function (key, callback) {
    var value = localStorage.getItem(key);

    callback(value);
    log('info', sprintf('OS storage - get %s.', key));
  },

  remove: function (key) {
    localStorage.removeItem(key);
    log('info', sprintf('OS storage - remove %s.', key));
  },

  clear: function () {
    localStorage.clear();
    log('info', 'OS storage - clear.');
  }
};

var storage = (function (key) {
  var storages = {
    'chrome.local': chromeLocalStorage,
    'localStorage': localStorage
  };

  return storages[key];
}) (globalSettings.STORAGE_TYPE);

module.exports = storage;
