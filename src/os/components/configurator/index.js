var Widget = require('../widget');

var Configurator = {
  Dialog: require('./dialog'),
  DefaultDialog: require('./default_dialog'),
  Header: Widget.Header,
  DefaultHeader: require('./default_header'),
  Body: Widget.Body,
  DefaultBody: require('./default_body'),

  IconsContainer: Widget.IconsContainer,
  CloseBtn: Widget.CloseBtn
};

module.exports = Configurator;
