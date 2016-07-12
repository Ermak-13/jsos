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
      todoList: [],
      widgetStyles: settings.DEFAULT_WIDGET_STYLES
    };
  },

  createTodo: function (e) {
    e.preventDefault();

    var todo = {
          title: this.refs.title.getValue()
        },
        todoList = this.state.todoList;

    todoList.push(todo);
    this.setState({
      todoList: todoList
    }, function () {
      this.refs.title.clear();
    }.bind(this));
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
          <HForm.Form onSubmit={ this.createTodo }>
            <div className="form-group">
              <div className="col-md-9">
                <Input
                  ref="title"
                  placeholder="Title"
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
              { this.getTodoListHTML() }
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

  getTodoListHTML: function () {
    var todoList = _.clone(this.state.todoList);

    return _.map(todoList, function (todo, i) {
      return this.getTodoHTML(todo, i);
    }.bind(this));
  },

  getTodoHTML: function (todo, key) {
    return (
      <tr key={ key }>
        <td>
          <form className="form-inline">
            <div className="checkbox">
              <label>
                <input type="checkbox" />
              </label>
            </div>
          </form>
        </td>

        <td>{ this.getPriorityHTML(todo) }</td>
        <td>{ todo.date || '-' }</td>
        <td>{ todo.title }</td>
      </tr>
    );
  },

  getPriorityHTML: function (todo) {
    priority = todo.priority || 'none';

    var color = {
      none: '#FFF',
      veryLow: '#D6C394',
      low: '#ffd35d',
      medium: '#ff6f49',
      high: '#cb4e2d',
      veryHigh: '#821000'
    }[priority];

    var styles = {
      backgroundColor: color,
      width: '15px',
      height: '15px',
      borderRadius: '8px'
    };

    return (
      <div style={ styles }>
      </div>
    );
  }
});

module.exports = _Widget;
