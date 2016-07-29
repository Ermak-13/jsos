var React = require('react'),

    OS = require('os'),
    HForm = OS.HForm,
    Input = OS.Input;

var TimeConfigsForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var settings = _.extend(
      _.clone(this.props.settings),
      {
        format: this.refs.format.getValue(),
        updatedInterval: this.refs.updatedInterval.getValue(),
        location: this.refs.location.getValue()
      }
    );

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      <HForm.Form onSubmit={ this.handleSubmit }>
        <HForm.Field
          labelText="format:">

          <Input
            ref="format"
            value={ settings.format }
          />
        </HForm.Field>

        <HForm.Field
          labelText="updated interval:">

          <Input
            type="number"
            ref="updatedInterval" 
            value={ settings.updatedInterval }
          />
        </HForm.Field>

        <HForm.Field
          labelText="location label:">

          <Input
            ref="location"
            value={ settings.location }
          />
        </HForm.Field>

        <HForm.Submit value="Save" />
      </HForm.Form>
    );
  }
});

module.exports = TimeConfigsForm;
