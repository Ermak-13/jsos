var React = require('react'),
    _ = require('underscore'),
    s = require('underscore.string'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Widget = OS.Widget,
    Configurator = OS.Configurator,
    Link = OS.Link,

    settings = require('./settings'),
    LinkCreatorDialog = require('./link_creator_dialog');

var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getDefaultProps: function () {
    return {
      name: settings.WIDGET_NAME,
      configuratorRefName: settings.CONFIGURATOR_REF_NAME,
      linkCreatorDialogRefName: settings.LINK_CREATOR_DIALOG_REF_NAME
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

  openLinkCreator: function () {
    var ref = this.refs[
      this.props.linkCreatorDialogRefName
    ];

    ref.open();
  },

  createLink: function (link) {
    var settings = this.getSettings(),
        links =  settings.links;

    links.push(link);
    settings.links = links;

    this.setSettings(settings);
  },

  setSettings: function (settings) {
    this.setState({
      links: settings.links,
      widgetStyles: settings.widgetStyles
    }, this.save);
  },

  getSettings: function () {
    return {
      links: _.clone(this.state.links),
      widgetStyles: _.clone(this.state.widgetStyles)
    };
  },

  componentWillMount: function () {
    this.load();
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

        <LinkCreatorDialog
          ref={ this.props.linkCreatorDialogRefName }
          onSubmit={ this.createLink }
        />
      </Widget.Widget>
    );
  },

  getLinksHTML: function () {
    var linksHTML = _.map(this.state.links, function (link, i) {
      return (
        <Link
          key={ i }
          href={ link.url }
          style={ this.state.linkStyles }>

          <img
            style={ this.state.iconStyles }
            src={ link.iconUrl }
          />

          <span style={ this.state.textStyles }>
            { link.text }
          </span>
        </Link>
      );

    }.bind(this));

    return linksHTML;
  },

  getLinkCreatorBtnHTML: function () {
    return (
      <Link
        style={ this.state.linkStyles }
        onClick={ this.openLinkCreator }>

        <span
          style={ this.state.iconStyles }
          className="fa fa-plus-square-o" />

        <span style={ this.state.textStyles }>
          add link
        </span>
      </Link>
    );
  }
});

module.exports = _Widget;
