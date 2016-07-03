var React = require('react');

var ConfigureBtn = React.createClass({
  getInitialState: function () {
    return {
      hover: false
    };
  },

  handleClick: function (e) {
    e.preventDefault();
    this.props.onClick();
  },

  handleMouseEnter: function () {
    this.toogleHover();
  },

  handleMouseLeave: function () {
    this.toogleHover();
  },

  toogleHover: function () {
    this.setState({
      hover: !this.state.hover
    });
  },

  getStyles: function () {
    if (this.state.hover) {
      return this.props.hoverStyle;
    } else {
      return this.props.style;
    }
  },

  render: function () {
    return (
      <a href="#"
        style={ this.getStyles() }
        onClick={ this.handleClick}
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }>

        <span className="glyphicon glyphicon-cog" />
      </a>
    );
  }
});

module.exports = ConfigureBtn;
