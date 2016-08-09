var sprintf = require('sprintf-js').sprintf,
    globalSettings = require('./default_settings'),
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
      log('info', sprintf('OS storage - get %s.', key));
      callback(result[key]);
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
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value);

    callback = callback || function () {
      log('info', sprintf('OS storage - set %s.', key));
    };
    callback();
  },

  get: function (key, callback) {
    var value = window.localStorage.getItem(key);
    value = JSON.parse(value);

    callback(value);
    log('info', sprintf('OS storage - get %s.', key));
  },

  remove: function (key) {
    window.localStorage.removeItem(key);
    log('info', sprintf('OS storage - remove %s.', key));
  },

  clear: function () {
    window.localStorage.clear();
    log('info', 'OS storage - clear.');
  }
};

var Storage = function (type) {
  var storage = {
    'chrome.local': chromeLocalStorage,
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
