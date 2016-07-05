var React = require('react'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Configurator = OS.Configurator,
    WidgetStylesForm = OS.WidgetStylesForm,

    settings = require('./settings');

var _Configurator = React.createClass({
  mixins: [Mixins.ConfiguratorHelper, Mixins.NavHelper],

  getDefaultProps: function () {
    return {
      refName: settings.CONFIGURATOR_REF_NAME
    };
  },

  getInitialState: function () {
    return {
      tab: 'widgetStyles'
    };
  },

  getSubmitHandler: function (tab) {
    var handlers = {
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
