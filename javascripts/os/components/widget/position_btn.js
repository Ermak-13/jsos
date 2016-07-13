var React = require('react'),
    Link = require('../link');

var PositionBtn = React.createClass({
  render: function () {
    return (
      <Link
        className="icon"
        onMouseDown={ this.props.onMouseDown }>

        <span className="fa fa-arrows" />
      </Link>
    );
  }
});

module.exports = PositionBtn;
