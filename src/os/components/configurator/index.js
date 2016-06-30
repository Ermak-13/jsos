var Widget = require('../widget');

var Configurator = {
  Dialog: require('./dialog'),
  Header: Widget.Header,
  DefaultHeader: require('./default_header'),
  Body: Widget.Body,

  IconsContainer: Widget.IconsContainer,
  CloseBtn: Widget.CloseBtn
};

module.exports = Configurator;
