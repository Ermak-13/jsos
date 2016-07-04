var React = require('react'),

    Mixins = require('../../mixins'),
    Configurator = require('../configurator'),
    HForm = require('../hform'),
    Input = require('../input'),
    Textarea = require('../textarea');

var _Configurator = React.createClass({
  mixins: [Mixins.ConfiguratorHelper],

  getDefaultProps: function () {
    return {
      refName: 'configurator'
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var settings = this.props.settings,

        desktopStyles = _.extend(
          _.clone(settings.desktopStyles),
          { background: this.refs.background.getValue() }
        ),

        configureBtnStyles = _.extend(
          _.clone(settings.configureBtnStyles),
          {}
        );

    settings = _.extend(
      _.clone(this.props.settings),
      {
        desktopStyles: desktopStyles,
        configureBtnStyles: configureBtnStyles
      }
    );

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      <Configurator.DefaultDialog
        ref={ this.props.refName }
        name={ this.props.name }>

        <HForm.Form onSubmit={ this.handleSubmit }>
          <HForm.Field
            labelText="background:">
            <Textarea
              ref="background"
              value={ settings.desktopStyles.background }
            />
          </HForm.Field>

          <HForm.Submit value="Save" />
        </HForm.Form>

      </Configurator.DefaultDialog>
    );
  }
});

module.exports = _Configurator;
