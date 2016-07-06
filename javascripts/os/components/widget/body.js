var React = require('react');

var Body = React.createClass({
  render: function () {
    return (
      <div className="widget-body">
        { this.props.children }
      </div>
    );
  }
});

module.exports = Body;
