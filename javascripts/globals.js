var modules = {
  React: require('react'),
  ReactDOM: require('react-dom'),
  _: require('underscore'),
  moment: require('moment-timezone'),

  OS: require('os')
};

for (var key in modules) {
  global[key] = modules[key];
}
