var React = require('react'),

    OS = require('os'),
    Link = OS.Link;

var ConfigureBtn = React.createClass({
  render: function () {
    return (
      <Link
        className="configure-btn"
        style={ this.props.style }
        onClick={ this.props.onClick }>

        <span className="glyphicon glyphicon-cog" />
      </Link>
    );
  }
});

module.exports = ConfigureBtn;
