var React = require('react'),

    OS = require('os'),
    HForm = OS.HForm,
    Input = OS.Input;

var CalendarConfigsForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();

    var settings = this.props.settings;

        monthStyles = _.extend(
          _.clone(settings.monthStyles),
          { fontSize: this.refs.monthFontSize.getValue() }
        ),

        dayStyles = _.extend(
          _.clone(settings.dayStyles),
          { fontSize: this.refs.dayFontSize.getValue() }
        );

    settings = _.extend(
      _.clone(this.props.settings),
      {
        monthStyles: monthStyles,
        dayStyles: dayStyles
      }
    );

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      <HForm.Form onSubmit={ this.handleSubmit }>
        <HForm.Field
          labelText="day font size:">
          <Input
            ref="dayFontSize"
            value={ settings.dayStyles.fontSize }
          />
        </HForm.Field>

        <HForm.Field
          labelText="month font size:">
          <Input
            ref="monthFontSize"
            value={ settings.monthStyles.fontSize }
          />
        </HForm.Field>

        <HForm.Submit value="Save" />
      </HForm.Form>
    );
  }
});

module.exports = CalendarConfigsForm;
