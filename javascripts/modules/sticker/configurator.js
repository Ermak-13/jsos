var React = require('react'),

    OS = require('os'),
    Mixins = OS.Mixins,

    Configurator = OS.Configurator,
    PositionAndSizeForm = OS.PositionAndSizeForm,

    StickerConfigsForm = require('./sticker_configs_form'),
    settings = require('./settings');

var _Configurator = React.createClass({
  mixins: [Mixins.ConfiguratorHelper, Mixins.NavHelper],

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
            <StickerConfigsForm
              onSubmit={ this.getSubmitHandler('stickerConfigs') }
              settings={ settings }
            />
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
        ref={ this.getRefName() }
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
