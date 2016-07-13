var React = require('react'),

    Header = require('./header'),
    DefaultIconsContainer = require('./default_icons_container');

var DefaultHeader = React.createClass({
  render: function () {
    return (
      <Header>
        <DefaultIconsContainer
          onMouseDownPositionBtn={ this.props.onMouseDownPositionBtn }

          onClickCloseBtn={ this.props.onClickCloseBtn }
          onClickConfigureBtn={ this.props.onClickConfigureBtn }
        />

        <h4>{ this.props.title }</h4>
      </Header>
    );
  }
});

module.exports = DefaultHeader;
