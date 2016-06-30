var React = require('react');

var CloseBtn = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    this.props.onClick(e);
  },

  render: function () {
    return (
      <a className="icon" onClick={ this.handleClick }>
        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </a>
    );
  }
});

module.exports = CloseBtn;
