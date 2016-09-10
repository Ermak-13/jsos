var _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf;

var I18n = function () {
  this.lang = 'en';
  this.dictionary = {};

  this.init = function (options) {
    this.lang = options.lang;
    this.dictionary = options.dictionary;
  };

  this.t = function (key, args) {
    return this.translate(key, args);
  };

  this.translate = function (key, args) {
    args = args || {};
    var s = this.dictionary[this.lang][key];

    if (s) {
      return sprintf(s, args);
    } else {
      return sprintf(key, args);
    }
  };

  this.getLang = function () {
    return this.lang;
  };

  this.setLang = function (lang) {
    this.lang = lang;
    global.OS.log('info', sprintf('I18n lang %s is activated.', lang));
  };

  this.getDict = function () {
    return this.dictionary;
  };

  this.registryDict = function (dict) {
    _.each(this.dictionary, function (langDict, lang) {
      langDict = _.extend(
        langDict,
        dict[lang] || {}
      );
    });
  };
};

module.exports = I18n;
