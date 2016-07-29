var React = require('react'),
    _ = require('underscore'),

    OS = require('os'),
    Configurator = OS.Configurator,
    PositionAndSizeForm = OS.PositionAndSizeForm,
    Mixins = OS.Mixins,

    settings = require('./settings'),
    TimeConfigsForm = require('./time_configs_form'),
    TimeStylesForm = require('./time_styles_form');

var _Configurator = React.createClass({
  mixins: [Mixins.NavHelper, Mixins.ConfiguratorHelper],

  getDefaultProps: function () {
    return {
      refName: settings.CONFIGURATOR_REF_NAME
    };
  },

  getInitialState: function () {
    return {
      tab: 'timeConfigs'
    };
  },

  getSubmitHandler: function (tab) {
    var handlers = {
      timeConfigs: function (settings) {
        this.props.onSubmit(settings);
      }.bind(this),

      positionAndSize: function(settings) {
        this.props.onSubmit(settings);
      }.bind(this),

      timeStyles: function (timeStyles) {
        var settings = _.clone(this.props.settings);
        settings.timeStyles = timeStyles;
        this.props.onSubmit(settings);
      }.bind(this)
    };

    return handlers[tab];
  },

  getTabs: function () {
    var settings = this.props.settings;

    return {
      timeConfigs: {
        navText: 'Time Configs',
        content: function () {
          return (
            <TimeConfigsForm
              onSubmit={ this.getSubmitHandler('timeConfigs') }
              settings={ settings }
            />
          );
        }.bind(this) (),
      },

      positionAndSize: {
        navText: 'Position And Size',
        content: function () {
          return (
            <PositionAndSizeForm
              onSubmit={ this.getSubmitHandler('positionAndSize') }
              settings={ settings }
            />
          );
        }.bind(this) ()
      },

      timeStyles: {
        navText: 'Styles',
        content: function () {
          return (
            <TimeStylesForm
              onSubmit={ this.getSubmitHandler('timeStyles') }
              settings={ settings.timeStyles }
            />
          );
        }.bind(this) ()
      }
    };
  },

  render: function () {
    return (
      <Configurator.DefaultDialog
        ref={ this.props.refName }
        name={ this.props.name }>

        { this.getNavHTML() }

        <div className="row" style={{ marginTop: '20px' }}>
          <div className="col-md-10 col-md-offset-1">
            { this.getContentHTML() }
          </div>
        </div>
      </Configurator.DefaultDialog>
    );
  }
});

module.exports = _Configurator;
