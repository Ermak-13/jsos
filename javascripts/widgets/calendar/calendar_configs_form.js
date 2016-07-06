var React = require('react'),

    OS = require('os'),
    HForm = OS.HForm,
    Input = OS.Input;

var CalendarConfigsForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();

    var settings = this.props.settings;

        calendarStyles = _.extend(
          _.clone(settings.calendarStyles),
          { width: this.refs.calendarWidth.getValue() }
        ),

        monthStyles = _.extend(
          _.clone(settings.monthStyles),
          { background: this.refs.monthBackground.getValue() }
        ),

        dayStyles = _.extend(
          _.clone(settings.dayStyles),
          { fontSize: this.refs.dayFontSize.getValue() }
        );

    settings = _.extend(
      _.clone(this.props.settings),
      {
        calendarStyles: calendarStyles,
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
          labelText="calendar width:">
          <Input
            ref="calendarWidth"
            value={ settings.calendarStyles.width }
          />
        </HForm.Field>

        <HForm.Field
          labelText="month background:">
          <Input
            ref="monthBackground"
            value={ settings.monthStyles.background }
          />
        </HForm.Field>

        <HForm.Field
          labelText="day font size:">
          <Input
            ref="dayFontSize"
            value={ settings.dayStyles.fontSize }
          />
        </HForm.Field>

        <HForm.Submit value="Save" />
      </HForm.Form>
    );
  }
});

module.exports = CalendarConfigsForm;
