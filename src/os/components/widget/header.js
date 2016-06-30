var React = require('react');

var Header = React.createClass({
  render: function () {
    return (
      <div className="widget-header">
        { this.pros.children }
      </div>
    );
  }
});

module.exports = Header;
