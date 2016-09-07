var React = require('react'),

    OS = require('os'),
    HForm = OS.HForm,
    Input = OS.Input,
    Submit = OS.Submit;

var Form = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();

    var url = this.refs.url.getValue();

    if (url && OS.isUrl(url)) {
      url = url.replace('raw.githubusercontent.com', 'cdn.rawgit.com');

      this.refs.url.clear();
      this.props.onSubmit(url);
    }
  },

  render: function() {
    return (
      <HForm.Form onSubmit={ this.handleSubmit }>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <div className="col-md-9">
            <Input
              placeholder={ global.I18n.t('installer.url.placeholder') }
              ref="url"
            />
          </div>

          <div className="col-md-3">
            <Submit
              style={{ width: '100%' }}
              value={ global.I18n.t('installer.submit.value') }
            />
          </div>
        </div>
      </HForm.Form>
    );
  }
});

module.exports = Form;
