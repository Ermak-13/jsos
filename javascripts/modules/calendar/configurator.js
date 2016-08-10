var React = require('react'),

    OS = require('os'),
    Configurator = OS.Configurator,
    PositionAndSizeForm = OS.PositionAndSizeForm,
    Mixins = OS.Mixins,

    settings = require('./settings'),
    CalendarConfigsForm = require('./calendar_configs_form');

var _Configurator = React.createClass({
  mixins: [Mixins.NavHelper, Mixins.ConfiguratorHelper],

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

      positionAndSize: function (settings) {
        this.props.onSubmit(settings);
      }.bind(this)
    };

    return handlers[tab];
  },

  getTabs: function () {
    var settings = this.props.settings;

    return {
      calendarConfigs: {
        navText: global.I18n.t('calendar.calendar_configs.nav_text'),
        content: function () {
          return (
            <CalendarConfigsForm
              onSubmit={ this.getSubmitHandler('calendarConfigs') }
              settings={ settings }
            />
          );
        }.bind(this) ()
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
