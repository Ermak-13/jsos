var React = require('react'),
    Widget = require('../widget');

var DefaultHeader = React.createClass({
  render: function () {
    return (
      <Widget.Header>
        <Widget.IconsContainer>
          <Widget.CloseBtn onClick={ this.props.onClickCloseBtn } />
        </Widget.IconsContainer>

        <h4>{ this.props.title }</h4>
      </Widget.Header>
    );
  }
});

module.exports = DefaultHeader;
