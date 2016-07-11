var React = require('react'),
    Link = require('../link');

var PositionBtn = React.createClass({
  render: function () {
    return (
      <Link
        className="icon"
        onClick={ this.props.onClick }>

        <span className="fa fa-arrows" />
      </Link>
    );
  }
});

module.exports = PositionBtn;
