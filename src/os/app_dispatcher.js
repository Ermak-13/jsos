var MicroEvent = require('microevent');

var AppDispatcher = function () {
  var _this = this;
};
MicroEvent.mixin(AppDispatcher);

module.exports = new AppDispatcher();
