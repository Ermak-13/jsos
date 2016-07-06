var React = require('react');

var Widget = React.createClass({
  render: function () {
    return (
      <div className="widget" style={ this.props.widgetStyles }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = Widget;
