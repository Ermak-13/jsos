var React = require('react'),

    IconsContainer = require('./icons_container'),
    CloseBtn = require('./close_btn'),
    ConfigureBtn = require('./configure_btn');

var DefaultIconsContainer = React.createClass({
  render: function () {
    return (
      <IconsContainer>
        <CloseBtn onClick={ this.props.onClickCloseBtn } />
        <ConfigureBtn onClick={ this.props.onClickConfigureBtn } />
      </IconsContainer>
    );
  }
});

module.exports = DefaultIconsContainer;
