var React = require('react'),
    s = require('underscore.string'),
    sprintf = require('sprintf-js').sprintf,

    Dialog = require('./dialog'),
    DefaultHeader = require('./default_header');
    Body = require('../widget').Body;

var DefaultDialog = React.createClass({
  handleClickCloseBtn: function () {
    this.refs.dialog.close();
  },

  open: function () {
    this.refs.dialog.open();
  },

  close: function () {
    this.refs.dialog.close();
  },

  getTitle: function () {
    return this.props.title || sprintf(
      s.capitalize(this.props.name)
    );
  },

  render: function () {
    return (
      <Dialog ref="dialog">
        <DefaultHeader
          title={ this.getTitle() }
          onClickCloseBtn={ this.handleClickCloseBtn }
        />

        <Body>
          { this.props.children }
        </Body>
      </Dialog>
    );
  }
});

module.exports = DefaultDialog;
