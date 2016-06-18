var React = require('react');
var _ = require('underscore');

var settings = require('./settings');


var Widget = React.createClass({
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
          <a className="icon">
            <i className="fa fa-close" aria-hidden="true"></i>
          </a>

          <a className="icon" onClick={ this.handleClickConfigurationIcon }>
            <i className="fa fa-wrench" aria-hidden="true"></i>
          </a>

          <h2>{ this.props.header }</h2>
        </div>

        <div className="widget-body">
          { this.props.children }
        </div>
      </div>
    );
  }
});

module.exports = Widget;
