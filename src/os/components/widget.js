var React = require('react'),
    _ = require('underscore'),
    s = require('underscore.string'),
    settings = require('../settings');

var Widget = React.createClass({
  getDefaultProps: function () {
    return {
      widgetHeaderDisabled: false,
      closingWidgetEnabled: true,
      widgetStyles: settings.DEFAULT_WIDGET_STYLES
    };
  },

  getWidgetStyles: function () {
    return this.props.widgetStyles;
  },

  handleClickConfigurationIcon: function (e) {
    e.preventDefault();
    this.props.openSettingsDialog();
  },

  getHeader: function () {
    return this.props.header || s.capitalize(this.props.name);
  },

  render: function () {
    return (
      <div className="widget" style={ this.getWidgetStyles() }>
        { this.props.widgetHeaderDisabled ? this.getIconsHTML() :  this.getWidgetHeaderHTML() }

        <div className="widget-body">
          { this.props.children }
        </div>
      </div>
    );
  },

  getWidgetHeaderHTML: function () {
    return (
      <div className="widget-header">
        { this.getIconsHTML() }

        <h4>{ this.getHeader() }</h4>
      </div>
    );
  },

  getIconsHTML: function () {
    return (
      <div className="icons-container">
        { this.props.closingWidgetEnabled && this.getClosingWidgetIconHTML() }
        { !_.isEmpty(this.props.openSettingsDialog) && this.getConfigurationIconHTML() }
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
