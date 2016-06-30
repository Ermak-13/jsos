var React = require('react'),
    s = require('underscore.string'),
    sprintf = require('sprintf-js').sprintf,

    Dialog = require('./dialog'),
    DefaultHeader = require('./default_header'),
    DefaultBody = require('./default_body');

var DefaultDialog = React.createClass({
  getDefaultProps: function () {
    return {
      onClickCloseBtn: function () {
        this.refs.dialog.close();
      }.bind(this)
    };
  },

  getTitle: function () {
    return this.props.title || sprintf(
      s.capitalize(this.props.name)
    );
  },

  render: function () {
    return (
      <Dialog ref="dialog">
        <DefaultHeader
          title={ this.getTitle() }
          onClickCloseBtn={ this.props.onClickCloseBtn }
        />

        <DefaultBody>
          { this.props.children }
        </DefaultBody>
      </Dialog>
    );
  }
});

module.exports = DefaultDialog;
