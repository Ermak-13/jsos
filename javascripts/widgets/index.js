var _ = require('underscore'),
    OS = require('os');

var Widgets = {
  Panel: require('./panel'),

  Logger: require('./logger'),
  Installer: require('./installer'),
  Webopener: require('./webopener'),
  Calendar: require('./calendar'),
  Clock: require('./clock'),
  Timer: require('./timer'),
  Sticker: require('./sticker')
};

module.exports = Widgets;
