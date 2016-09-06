var React = require('react'),
    _ = require('underscore'),
    s = require('underscore.string'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Widget = OS.Widget,

    settings = require('./settings'),
    ScriptsTab = require('./scripts_tab');

var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getInitialState: function () {
    return {
      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION
    };
  },

  handleAddScript: function (e) {
    e.preventDefault();

    var url = this.refs.installUrl.getValue();
    if (url) {
      this.refs.installUrl.clear();
      OS.installScript(url);
    }
  },

  handleRemoveScript: function (script) {
    OS.uninstallScript(script);
  },

  _getSettings: function () {
    return {
      size: _.clone(this.state.size),
      position: _.clone(this.state.position)
    };
  },

  componentWillMount: function () {
    this.init();
  },

  _load: function (onLoad) {
    this.loadSettings(onLoad);
  },

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.getWidgetStyles() }>
        <Widget.DefaultHeader
          title={ s.capitalize(this.props.widgetName) }
          onMouseDownPositionBtn={ this.handleStartMoving }
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this.openConfigurator }
        />

        <Widget.Body>
          <ScriptsTab />
        </Widget.Body>
      </Widget.Widget>
    );
  }
});

module.exports = _Widget;
