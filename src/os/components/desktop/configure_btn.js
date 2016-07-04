var React = require('react'),
    Link = require('../link');

var ConfigureBtn = React.createClass({
  render: function () {
    return (
      <Link
        style={ this.props.style }
        hoverStyle={ this.props.hoverStyle }
        onClick={ this.props.onClick }>

        <span className="glyphicon glyphicon-cog" />
      </Link>
    );
  }
});

module.exports = ConfigureBtn;
