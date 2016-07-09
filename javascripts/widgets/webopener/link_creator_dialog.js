var React = require('react'),

    OS = require('os'),
    Dialog = OS.Dialog.Default;

var LinkCreatorDialog = React.createClass({
  open: function () {
    this.refs.dialog.open();
  },

  close: function () {
    this.refs.dialog.close();
  },

  render: function () {
    return (
      <Dialog
        ref="dialog"
        title="Link Creator - Webopener">
      </Dialog>
    );
  }
});

module.exports = LinkCreatorDialog;
