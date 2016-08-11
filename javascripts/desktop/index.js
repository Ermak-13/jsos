var Desktop = require('./desktop'),
    locales = require('./locales');

global.I18n.registryDict(locales);
module.exports = Desktop;
