var React = require('react'),

    OS = require('os'),
    Link = OS.Link;

var DownloadsShortcut = React.createClass({
  handleClick: function () {
    chrome.tabs.create({
      url: 'chrome://downloads'
    });
  },

  render: function () {
    return (
      <Link
        className={ this.props.className }
        onClick={ this.handleClick }>

        <span className="fa fa-download" />
      </Link>
    );
  }
});

module.exports = DownloadsShortcut;
