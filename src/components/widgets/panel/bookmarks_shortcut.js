var React = require('react'),

    OS = require('os'),
    Link = OS.Link;

var BookmarksShortcut = React.createClass({
  handleClick: function () {
    chrome.tabs.create({
      url: 'chrome://bookmarks'
    });
  },

  render: function () {
    return (
      <Link
        style={ this.props.style }
        hoverStyle={ this.props.hoverStyle }
        onClick={ this.handleClick }>

        <span className="glyphicon glyphicon-bookmark" />
      </Link>
    );
  }
});

module.exports = BookmarksShortcut;
