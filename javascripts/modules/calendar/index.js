var Widget = require('./widget'),
    Shortcut = require('./shortcut'),
    locales = require('./locales');

global.I18n.registryDict(locales);
module.exports = {
  Widget: Widget,
  Shortcut: Shortcut
};
