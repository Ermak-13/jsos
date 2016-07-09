var React = require('react'),
    _ = require('underscore'),
    s = require('underscore.string'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Widget = OS.Widget,
    Configurator = OS.Configurator,
    Link = OS.Link,

    settings = require('./settings');

var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getDefaultProps: function () {
    return {
      name: settings.WIDGET_NAME,
      configuratorRefName: settings.CONFIGURATOR_REF_NAME
    };
  },

  getInitialState: function () {
    return {
      links: [],

      widgetStyles: settings.DEFAULT_WIDGET_STYLES,
      linkStyles: settings.DEFAULT_LINK_STYLES,
      iconStyles: settings.DEFAULT_ICON_STYLES,
      textStyles: settings.DEFAULT_TEXT_STYLES
    };
  },

  setSettings: function (settings) {
    this.setState({
      widgetStyles: settings.widgetStyles
    });
  },

  getSettings: function () {
    return {
      widgetStyles: _.clone(this.state.widgetStyles)
    };
  },

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.state.widgetStyles }>
        <Widget.DefaultHeader
          title={ s.capitalize(this.props.name) }
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this.openConfigurator }
        />

        <Widget.Body>
          { this.getLinksHTML() }

          { this.getLinkCreatorBtnHTML() }
        </Widget.Body>

        <Configurator.Default
          ref={ this.props.configuratorRefName }
          name={ this.props.name }
          settings={ this.getSettings() }
          onSubmit={ this.handleConfigure }
        />
      </Widget.Widget>
    );
  },

  getLinksHTML: function () {
    var linksHTML = _.map([0,1,2,3,4], function () {
      return (
        <Link style={ this.state.linkStyles }>
          <img
            style={ this.state.iconStyles }
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/VK.com-logo.svg/2000px-VK.com-logo.svg.png"
          />

          <span style={ this.state.textStyles }>
            vk.com
          </span>
        </Link>
      );

    }.bind(this));

    return linksHTML;
  },

  getLinkCreatorBtnHTML: function () {
    return (
      <div style={ this.state.linkStyles }>
        <Link>
          <span
            style={ this.state.iconStyles }
            className="fa fa-plus-square-o" />

          <span style={ this.state.textStyles }>
            add link
          </span>
        </Link>
      </div>
    );
  }
});

module.exports = _Widget;
