var React = require('react'),

    OS = require('os'),
    Configurator = OS.Configurator,
    WidgetStylesForm = OS.WidgetStylesForm,
    Mixins = OS.Mixins,

    settings = require('./widget_settings'),
    CalendarConfigsForm = require('./calendar_configs_form');

var _Configurator = React.createClass({
  mixins: [Mixins.NavHelper, Mixins.ConfiguratorHelper],

  getDefaultProps: function () {
    return {
      refName: settings.CONFIGURATOR_REF_NAME
    };
  },

  getInitialState: function () {
    return {
      tab: 'calendarConfigs'
    };
  },

  getSubmitHandler: function (tab) {
    var handlers = {
      calendarConfigs: function (settings) {
        this.props.onSubmit(settings);
      }.bind(this),

      widgetStyles: function (widgetStyles) {
        var settings = _.clone(this.props.settings);
        settings.widgetStyles = widgetStyles;

        this.props.onSubmit(settings);
      }.bind(this)
    };

    return handlers[tab];
  },

  getTabs: function () {
    var settings = this.props.settings;

    return {
      calendarConfigs: {
        navText: 'Calendar Configs',
        content: function () {
          return (
            <CalendarConfigsForm
              onSubmit={ this.getSubmitHandler('calendarConfigs') }
              settings={ settings }
            />
          );
        }.bind(this) ()
      },

      widgetStyles: {
        navText: 'Widget Styles',
        content: function () {
          return (
            <WidgetStylesForm
              onSubmit={ this.getSubmitHandler('widgetStyles') }
              settings={ settings.widgetStyles }
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
