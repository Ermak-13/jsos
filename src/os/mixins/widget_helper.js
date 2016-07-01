var AppDispatcher = require('../app_dispatcher'),
    Events = require('../events');

var WidgetHelper = {
  close: function () {
    AppDispatcher.removeWidget(this.props.widgetId);
  },

  openConfigurator: function () {
    var refName = this.props.configuratorRefName,
        ref = this.refs[refName];

    ref.open();
  }
};

module.exports = WidgetHelper;
