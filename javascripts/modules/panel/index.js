var Widget = require('./widget'),
    locales = require('./locales');

global.I18n.registryDict(locales);
module.exports = {
  Widget: Widget
};
