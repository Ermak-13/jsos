var _ = require('underscore');
require('./globals');

OS.init = function (options) {
  var loader = new OS.Loader(options);
  loader.load(function () {
    var Modules = require('./modules'),
    Desktop = require('./desktop');

    _.each(Modules, function (module, name) {
      OS.installModule(name, module);
    });

    ReactDOM.render(
      React.createElement(Desktop, {}),
      document.getElementById(options.containerId)
    );

    if (_.isFunction(options.onload)) {
      options.onload();
    }
  });
};
