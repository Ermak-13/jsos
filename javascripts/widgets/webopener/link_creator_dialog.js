var React = require('react'),

    OS = require('os'),
    Dialog = OS.Dialog.Default,
    HForm = OS.HForm,
    Input = OS.Input;

var LinkCreatorDialog = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();

    var link = {
      url: this.refs.linkUrl.getValue(),
      iconUrl: this.refs.iconUrl.getValue(),
      text: this.refs.text.getValue()
    };

    this.close();
    this.props.onSubmit(link);
  },

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

        <HForm.Form onSubmit={ this.handleSubmit }>
          <HForm.Field
            labelText="link url:">
            <Input
              ref="linkUrl" />
          </HForm.Field>

          <HForm.Field
            labelText="icon url:">
            <Input
              ref="iconUrl"
            />
          </HForm.Field>

          <HForm.Field
            labelText="text:">
            <Input
              ref="text"
            />
          </HForm.Field>

          <HForm.Submit value="Add" />
        </HForm.Form>
      </Dialog>
    );
  }
});

module.exports = LinkCreatorDialog;
