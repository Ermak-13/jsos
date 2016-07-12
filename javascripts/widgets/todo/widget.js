var React = require('react'),
    _ = require('underscore'),
    s = require('underscore.string'),

    OS = require('os'),
    Mixins = OS.Mixins,
    IForm = OS.IForm,
    HForm = OS.HForm,
    Input = OS.Input,
    Input = OS.Input,
    Widget = OS.Widget,
    Configurator = OS.Configurator,

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
      widgetStyles: settings.DEFAULT_WIDGET_STYLES
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
          <HForm.Form>
            <div className="form-group">
              <div className="col-md-9">
                <Input
                />
              </div>

              <div className="col-md-3">
                <Input
                  type="submit"
                  style={{ width: '100%' }}
                  className="btn btn-primary"
                  value="Create"
                />
              </div>
            </div>
          </HForm.Form>

          <table className="table">
            <tbody>
              { this.getTodoHTML() }
              { this.getTodoHTML() }
              { this.getTodoHTML() }
            </tbody>
          </table>
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

  getTodoHTML: function () {
    return (
      <tr>
        <td>
          <form className="form-inline">
            <div className="checkbox">
              <label>
                <input type="checkbox" />
              </label>
            </div>
          </form>
        </td>

        <td></td>
        <td>03/07</td>
        <td>Необходимо сделать todo</td>
      </tr>
    );
  }
});

module.exports = _Widget;
