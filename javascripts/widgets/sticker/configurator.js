var React = require('react'),

    OS = require('os'),
    Mixins = OS.Mixins,

    Configurator = OS.Configurator,
    PositionAndSizeForm = OS.PositionAndSizeForm,

    settings = require('./settings');

var _Configurator = React.createClass({
  mixins: [Mixins.ConfiguratorHelper, Mixins.NavHelper],

  getDefaultProps: function () {
    return {
      refName: settings.CONFIGURATOR_REF_NAME
    };
  },

  getSubmitHandler: function (tab) {
    var handlers = {
      stickerConfigs: function (settings) {
        this.props.onSubmit(settings);
      }.bind(this),

      positionAndSize: function (settings) {
        this.props.onSubmit(settings);
      }.bind(this),
    };

    return handlers[tab];
  },

  getInitialState: function () {
    return {
      tab: 'stickerConfigs'
    };
  },

  getTabs: function () {
    var settings = this.props.settings;

    return {
      stickerConfigs: {
        navText: 'Sticker Configs',
        content: function () {
          return (
            <div></div>
          );
        }.bind(this) ()
      },

      positionAndSize: {
        navText: 'Position and Size',
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
