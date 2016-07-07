var React = require('react'),

    OS = require('os'),
    Link = OS.Link;

var HistoryShortcut = React.createClass({
  handleClick: function () {
    chrome.tabs.create({
      url: 'chrome://history'
    });
  },

  render: function () {
    return (
      <Link
        className={ this.props.className }
        style={ this.props.style }
        onClick={ this.handleClick }>

        <span className="glyphicon glyphicon-time" />
      </Link>
    );
  }
});

module.exports = HistoryShortcut;
