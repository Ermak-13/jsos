var React = require('react'),

    OS = require('os'),
    Form = require('./form'),
    Container = require('./container');

var StylesTab = React.createClass({
  getInitialState: function() {
    return {
      styles: global.Styles.all()
    };
  },

  add: function (url) {
    OS.installStyle(url);
  },

  remove: function (style) {
    OS.uninstallStyle(style);
  },

  componentWillMount: function () {
    global.Styles.updated(function (styles) {
      this.setState({
        styles: styles
      });
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <p className="text-justify" style={{ fontSize: '14px' }}
          dangerouslySetInnerHTML={{ __html: I18n.t('installer.styles.text') }} />

        <Form
          onSubmit={ this.add }
        />

        <Container
          collection={ this.state.styles }
          onClickRemoveBtn={ this.remove }
        />
      </div>
    );
  }
});

module.exports = StylesTab;
