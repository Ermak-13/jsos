var sprintf = require('sprintf-js').sprintf;

var localStorage = {
  set: function (key, value, callback) {
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value);

    callback = callback || function () {
      global.OS.log('info', sprintf('OS storage - set %s.', key));
    };
    callback();
  },

  get: function (key, callback) {
    var value = window.localStorage.getItem(key);
    value = JSON.parse(value);

    callback(value);
    global.OS.log('info', sprintf('OS storage - get %s.', key));
  },

  remove: function (key) {
    window.localStorage.removeItem(key);
    global.OS.log('info', sprintf('OS storage - remove %s.', key));
  },

  clear: function () {
    window.localStorage.clear();
    global.OS.log('info', 'OS storage - clear.');
  }
};

module.exports = localStorage;
