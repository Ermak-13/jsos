var React = require('react'),

    OS = require('os'),
    Dialog = OS.Dialog.Default,
    HForm = OS.HForm,
    Input = OS.Input;

var LinkCreatorDialog = React.createClass({
  getInitialState: function () {
    return {
      linkText: null
    };
  },

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

  handleChangeLinkUrl: function (url) {
    var parsedUrl = OS.parseURL(url);
    if (parsedUrl) {
      var linkText = parsedUrl.hostname;
      this.setState({
        linkText: linkText
      });
    }
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
              ref="linkUrl"
              onChange={ this.handleChangeLinkUrl }
            />
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
              value={ this.state.linkText }
            />
          </HForm.Field>

          <HForm.Submit value="Add" />
        </HForm.Form>
      </Dialog>
    );
  }
});

module.exports = LinkCreatorDialog;
