var React = require('react'),

    OS = require('os'),
    Link = OS.Link;

var Shortcut = React.createClass({
  render: function () {
    return (
      <Link
        className={ this.props.className }
        onClick={ this.props.onClick }>

        <span className="fa fa-hourglass-half" />
      </Link>
    );
  }
});

module.exports = Shortcut;
