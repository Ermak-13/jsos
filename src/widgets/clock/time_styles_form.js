var React = require('react'),

    OS = require('os'),
    HForm = OS.HForm,
    Input = OS.Input;

var TimeStylesForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var settings = _.extend(
      _.clone(this.props.settings),
      {
        height: this.refs.height.getValue(),
        lineHeight: this.refs.lineHeight.getValue(),
        fontSize: this.refs.fontSize.getValue()
      }
    );

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      <HForm.Form onSubmit={ this.handleSubmit }>
        <HForm.Field
          labelText="height:">

          <Input
            ref="height"
            value={ settings.height }
          />
        </HForm.Field>

        <HForm.Field
          labelText="line height:">

          <Input
            ref="lineHeight"
            value={ settings.lineHeight }
          />
        </HForm.Field>

        <HForm.Field
          labelText="font size:">

          <Input
            ref="fontSize"
            value={ settings.fontSize }
          />
        </HForm.Field>

        <HForm.Submit value="Save" />
      </HForm.Form>
    );
  }
});

module.exports = TimeStylesForm;
