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
        navText: global.I18n.t('sticker.sticker_configs.nav_text'),
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
