var React = require('react');

var IconsContainer = React.createClass({
  render: function () {
    return (
      <div className="icons-container">
        { this.props.children }
      </div>
    );
  }
});

module.exports = IconsContainer;
