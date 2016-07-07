var React = require('react');

var Link = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    this.props.onClick();
  },

  render: function () {
    return (
      <a href="#"
        style={ this.props.style }
        className={ this.props.className }

        onClick={ this.handleClick}>

        { this.props.children }
      </a>
    );
  }
});

module.exports = Link;
