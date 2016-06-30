var React = require('react');

var Widget = React.createClass({
  render: function () {
    return (
      <div className="widget" style={ this.props.widgetStyles }>
        { this.props.children }
      </div>
    );
  }
});

var Header = React.createClass({
  render: function () {
    return (
      <div className="widget-header">
        { this.pros.children }
      </div>
    );
  }
});

var DefaultHeader = React.createClass({
  render: function () {
    return (
      <Header>
        <DefaultIconsContainer
          onClickCloseBtn={ this.props.onClickCloseBtn }
          onClickConfigureBtn={ this.props.onClickConfigureBtn }
        />
        
        <h4>{ this.props.title }</h4>
      </Header>
    );
  }
});

var Body = React.createClass({
  render: function () {
    return (
      <div className="widget-body">
        { this.props.children }
      </div>
    );
  }
});

var CloseBtn = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    this.props.onClick(e);
  },

  render: function () {
    return (
      <a className="icon" onClick={ this.handleClick }>
        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </a>
    );
  }
});

var IconsContainer = React.createClass({
  render: function () {
    return (
      <div className="icons-container">
        { this.props.children }
      </div>
    );
  }
});

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

var ConfigureBtn = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    this.props.onClick(e);
  },

  render: function () {
    return (
      <a className="icon" onClick={ this.handleClick }>
        <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
      </a>
    );
  }
});

module.exports = {
  Widget: Widget,
  Header: Header,
  DefaultHeader: DefaultHeader,
  Body: Body,

  IconsContainer: IconsContainer,
  DefaultIconsContainer: DefaultIconsContainer,

  CloseBtn: CloseBtn,
  ConfigureBtn: ConfigureBtn
};
