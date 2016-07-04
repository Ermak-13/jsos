var React = require('react'),

    OS = require('os'),
    Widget = OS.Widget,

    settings = require('./widget_settings');

var _Widget = React.createClass({
  getInitialState: function () {
    return {
      widgetStyles: settings.DEFAULT_WIDGET_STYLES
    };
  },

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.state.widgetStyles }>
      </Widget.Widget>
    );
  }
});

module.exports = _Widget;
