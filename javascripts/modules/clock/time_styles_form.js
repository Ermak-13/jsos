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
          labelText={ global.I18n.t('clock.margin_top.label') }>

          <Input
            ref="marginTop"
            value={ settings.marginTop }
          />
        </HForm.Field>

        <HForm.Field
          labelText={ global.I18n.t('clock.font_size.label') }>

          <Input
            ref="fontSize"
            value={ settings.fontSize }
          />
        </HForm.Field>

        <HForm.Submit value={ global.I18n.t('configurator.submit.value') } />
      </HForm.Form>
    );
  }
});

module.exports = TimeStylesForm;
