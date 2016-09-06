var React = require('react'),

    OS = require('os'),
    HForm = OS.HForm,
    Input = OS.Input,
    Submit = OS.Submit,
    Link = OS.Link;

var ScriptsTab = React.createClass({
  getInitialState: function () {
    return {
      scripts: global.Scripts.all()
    };
  },

  handleAdd: function (url) {
    OS.installScript(url);
  },

  handleRemove: function (script) {
    OS.uninstallScript(script);
  },

  componentWillMount: function () {
    global.Scripts.updated(function (scripts) {
      this.setState({
        scripts: scripts
      });
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <Form
          onSubmit={ this.handleAdd }
        />

        <Table
          scripts={ this.state.scripts }
          onRemove={ this.handleRemove }
        />
      </div>
    );
  }
});

var Form = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();

    var url = this.refs.url.getValue();
    if (url) {
      this.refs.url.clear();
      this.props.onSubmit(url);
    }
  },

  render: function () {
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

var Table = React.createClass({
  render: function () {
    return (
      <table
        className="table table-hover"
        style={{ marginBottom: 0 }}>

        <tbody>
          { this.getScriptsTrHTML() }
        </tbody>
      </table>
    );
  },

  getScriptsTrHTML: function () {
    var scriptsTrHTML = _.map(this.props.scripts, function (script, i) {
      return (
        <tr key={ i }>
          <td>
            <Link
              href={ script.url }>
              { script.url }
            </Link>
          </td>
          <td>
            <Link
              className="btn btn-danger btn-xs pull-right"
              onClick={ this.props.onRemove.bind(this, script) }>
              <span className="fa fa-remove" />
            </Link>
          </td>
        </tr>
      );
    }.bind(this));

    return scriptsTrHTML;
  }
});

module.exports = ScriptsTab;
