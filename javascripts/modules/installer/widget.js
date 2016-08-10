var React = require('react'),
    _ = require('underscore'),
    s = require('underscore.string'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Widget = OS.Widget,
    HForm = OS.HForm,
    Input = OS.Input,
    Submit = OS.Submit,
    Link = OS.Link,

    settings = require('./settings');

var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getInitialState: function () {
    return {
      scripts: Scripts.all(),
      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION
    };
  },

  handleAddScript: function (e) {
    e.preventDefault();

    var url = this.refs.installUrl.getValue();
    if (url) {
      this.refs.installUrl.clear();
      OS.installScript(url);
    }
  },

  handleRemoveScript: function (script) {
    OS.uninstallScript(script);
  },

  _getSettings: function () {
    return {
      size: _.clone(this.state.size),
      position: _.clone(this.state.position)
    };
  },

  componentWillMount: function () {
    this.init();

    Scripts.updated(function (scripts) {
      this.setState({
        scripts: scripts
      });
    }.bind(this));
  },

  _load: function (onLoad) {
    this.loadSettings(onLoad);
  },

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.getWidgetStyles() }>
        <Widget.DefaultHeader
          title={ s.capitalize(this.props.widgetName) }
          onMouseDownPositionBtn={ this.handleStartMoving }
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this.openConfigurator }
        />

        <Widget.Body>
          <HForm.Form onSubmit={ this.handleAddScript }>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <div className="col-md-9">
                <Input
                  placeholder={ global.I18n.t('installer.url.placeholder') }
                  ref="installUrl"
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

          <table
            className="table table-hover"
            style={{ marginBottom: 0 }}>

            <tbody>
              { this.getScriptsTrHTML() }
            </tbody>
          </table>
        </Widget.Body>
      </Widget.Widget>
    );
  },

  getScriptsTrHTML: function () {
    var scriptsTrHTML = _.map(this.state.scripts, function (script, i) {
      return (
        <tr key={ i }>
          <td>
            <Link
              href={ script.src }>
              { script.src }
            </Link>
          </td>
          <td>
            <Link
              className="btn btn-danger btn-sm"
              onClick={ this.handleRemoveScript.bind(this, script) }>
              delete
            </Link>
          </td>
        </tr>
      );
    }.bind(this));

    return scriptsTrHTML;
  }
});

module.exports = _Widget;
