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
        navText: global.I18n.t('clock.time_configs.nav_text'),
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
        navText: global.I18n.t('position_and_size_form.nav_text'),
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
        navText: global.I18n.t('clock.styles.nav_text'),
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
        ref={ this.getRefName() }
        name={ this.props.name }
        onClose={ this.props.onClose }>

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
