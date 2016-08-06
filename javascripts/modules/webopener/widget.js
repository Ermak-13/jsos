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
      linkCreatorDialogRefName: settings.LINK_CREATOR_DIALOG_REF_NAME
    };
  },

  getInitialState: function () {
    return {
      links: [],

      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION,
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
    var links = this.state.links;
    links.push(link);

    this._setData({
      links: links
    }, this.saveData);
  },

  getData: function () {
    return {
      links: _.clone(this.state.links)
    };
  },

  getSettings: function () {
    return {
      links: _.clone(this.state.links),
      size: _.clone(this.state.size),
      position: _.clone(this.state.position)
    };
  },

  componentWillMount: function () {
    this.init();
  },

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.getWidgetStyles() }>
        <Widget.DefaultHeader
          title={ s.capitalize(this.getName()) }
          onMouseDownPositionBtn={ this.handleStartMoving }
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this._openConfigurator }
        />

        <Widget.Body>
          { this.getLinksHTML() }

          { this.getLinkCreatorBtnHTML() }
        </Widget.Body>

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
