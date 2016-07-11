var React = require('react'),

    IconsContainer = require('./icons_container'),
    CloseBtn = require('./close_btn'),
    ConfigureBtn = require('./configure_btn'),
    PositionBtn = require('./position_btn');

var DefaultIconsContainer = React.createClass({
  render: function () {
    return (
      <IconsContainer>
        <PositionBtn />
        <ConfigureBtn onClick={ this.props.onClickConfigureBtn } />
        <CloseBtn onClick={ this.props.onClickCloseBtn } />
      </IconsContainer>
    );
  }
});

module.exports = DefaultIconsContainer;
