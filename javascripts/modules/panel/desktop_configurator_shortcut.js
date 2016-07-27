var React = require('react'),

    OS = require('os'),
    AppDispatcher = OS.AppDispatcher,
    Link = OS.Link;

var DesktopConfiguratorShortcut = React.createClass({
  handleClick: function () {
    AppDispatcher.openDesktopConfigurator();
  },

  render: function () {
    return (
      <Link
        className={ this.props.className }
        onClick={ this.handleClick }>

        <span className="fa fa-desktop" />
      </Link>
    );
  }
});

module.exports = DesktopConfiguratorShortcut;
