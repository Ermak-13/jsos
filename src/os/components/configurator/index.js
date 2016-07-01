var Widget = require('../widget');

var Configurator = {
  Default: require('./default'),
  Dialog: require('./dialog'),
  DefaultDialog: require('./default_dialog'),
  Header: Widget.Header,
  DefaultHeader: require('./default_header'),
  Body: Widget.Body,

  IconsContainer: Widget.IconsContainer,
  CloseBtn: Widget.CloseBtn
};

module.exports = Configurator;
