var React = require('react'),
    s = require('underscore.string'),
    sprintf = require('sprintf-js').sprintf,

    Dialog = require('./dialog'),
    DefaultHeader = require('./default_header'),
    Body = require('./body');

var DefaultDialog = React.createClass({
  getDefaultProps: function () {
    return {
      onOpen: function () {},
      onClose: function () {}
    };
  },

  handleClickCloseBtn: function () {
    this.close();
  },

  open: function () {
    this.refs.dialog.open();
    this.props.onOpen();
  },

  close: function () {
    this.refs.dialog.close();
    this.props.onClose();
  },

  getTitle: function () {
    return this.props.title || sprintf(
      '%s - Settings',
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
