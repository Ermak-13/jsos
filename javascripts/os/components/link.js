var React = require('react');

var Link = React.createClass({
  handleClick: function (e) {
    e.preventDefault();

    var onClick = this.props.onClick || this.defaultOnClick;
    onClick();
  },

  defaultOnClick: function () {
    window.location.href = this.props.href;
  },

  render: function () {
    return (
      <a href={ this.props.href }
        style={ this.props.style }
        className={ this.props.className }

        onClick={ this.handleClick}>

        { this.props.children }
      </a>
    );
  }
});

module.exports = Link;
