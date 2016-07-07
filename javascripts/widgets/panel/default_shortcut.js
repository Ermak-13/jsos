var React = require('react'),

    OS = require('os'),
    Link = OS.Link;

var DefaultShortcut = React.createClass({
  render: function () {
    return (
      <Link
        className={ this.props.className }
        onClick={ this.props.onClick }>

        <span className="fa fa-asterisk" />
      </Link>
    );
  }
});

module.exports = DefaultShortcut;
