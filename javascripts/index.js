var _ = require('underscore');
require('./globals');

var loader = new OS.Loader();
loader.load(function () {
  var Modules = require('./modules'),
      Desktop = require('./desktop');

  _.each(Modules, function (module, name) {
    OS.installModule(name, module);
  });

  ReactDOM.render(
    <Desktop />,
    document.getElementById('desktop-container')
  );
});
