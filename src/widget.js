var React = require('react');
var _ = require('underscore');

var settings = require('./settings');

var Widget = React.createClass({
  getDefaultProps: function () {
    return {
      closingWidgetEnabled: true,
      configuratingWidgetEnabled: true,
    };
  },

  getInitialState: function () {
    return {
      widgetStyles: settings.DEFAULT_WIDGET_STYLES
    };
  },

  getWidgetStyles: function () {
    return this.state.widgetStyles;
  },

  handleClickConfigurationIcon: function (e) {
    e.preventDefault();
  },

  render: function () {
    return (
      <div className="widget" style={ this.getWidgetStyles() }>
        <div className="widget-header">
          { this.props.closingWidgetEnabled && this.getClosingWidgetIconHTML() }
          { this.props.configuratingWidgetEnabled && this.getConfigurationIconHTML() }

          <h4>{ this.props.header }</h4>
        </div>

        <div className="widget-body">
          { this.props.children }
        </div>
      </div>
    );
  },

  getClosingWidgetIconHTML: function () {
    return (
      <a className="icon">
        <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
      </a>
    );
  },

  getConfigurationIconHTML: function () {
    return (
      <a className="icon" onClick={ this.handleClickConfigurationIcon }>
        <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
      </a>
    );
  }
});

module.exports = Widget;
