var React = require('react'),
    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events');

var Desktop = React.createClass({
  getInitialState: function () {
    return {
      widgets: []
    };
  },

  addWidget: function (WidgetClass) {
    var widgets = this.state.widgets,
        id = widgets.length;

    widgets.push(
      React.createElement(
        WidgetClass,
        {
          key: id,
          id: id
        }
      )
    );

    this.setState({
      widgets: widgets
    });
  },

  componentDidMount: function () {
    AppDispatcher.bind(Events.addWidget, function (WidgetClass) {
      this.addWidget(WidgetClass);
    }.bind(this));
  },

  render: function () {
    return (
      <div id="desktop">
        <div id="widgets-container">
          { this.state.widgets }
        </div>
      </div>
    );
  }
});

module.exports = Desktop;
