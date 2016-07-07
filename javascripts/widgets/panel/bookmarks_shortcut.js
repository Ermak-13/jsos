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
        className={ this.props.className }
        onClick={ this.handleClick }>

        <span className="fa fa-bookmark" />
      </Link>
    );
  }
});

module.exports = BookmarksShortcut;
