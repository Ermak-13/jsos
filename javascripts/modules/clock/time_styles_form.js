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
        marginTop: this.refs.marginTop.getValue(),
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
          labelText="margin top:">

          <Input
            ref="marginTop"
            value={ settings.marginTop }
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
