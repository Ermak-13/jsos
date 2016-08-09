var React = require('react'),
    _ = require('underscore'),

    OS = require('os'),
    HForm = OS.HForm,

    Input = OS.Input,
    ColorInput = OS.ColorInput;

var StickerConfigsForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();

    var settings = _.clone(this.props.settings),
        widgetStyles = _.clone(settings.widgetStyles),
        textareaStyles = _.clone(settings.textareaStyles);

    widgetStyles.background = this.refs.background.getValue();
    widgetStyles.transform = this.refs.transform.getValue();
    textareaStyles.fontSize = this.refs.fontSize.getValue();

    settings.widgetStyles = widgetStyles;
    settings.textareaStyles = textareaStyles;

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      <HForm.Form onSubmit={ this.handleSubmit }>
        <HForm.Field
          labelText="font size:">

          <Input
            ref="fontSize"
            value={ settings.textareaStyles.fontSize }
          />
        </HForm.Field>

        <HForm.Field
          labelText="angle:">

          <Input
            ref="transform"
            value={ settings.widgetStyles.transform }
          />
        </HForm.Field>

        <HForm.Field
          labelText="background:">

          <ColorInput
            ref="background"
            value={ settings.widgetStyles.background }
          />
        </HForm.Field>

        <HForm.Submit value="Save" />
      </HForm.Form>
    );
  }
});

module.exports = StickerConfigsForm;
