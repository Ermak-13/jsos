var React = require('react'),

    Header = require('./header'),
    IconsContainer = require('./icons_container'),
    CloseBtn = require('./close_btn');

var DefaultHeader = React.createClass({
  render: function () {
    return (
      <Header>
        <IconsContainer>
          <CloseBtn onClick={ this.props.onClickCloseBtn } />
        </IconsContainer>

        <h4>{ this.props.title }</h4>
      </Header>
    );
  }
});

module.exports = DefaultHeader;
