var React = require('react'),
    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events');

var Desktop = React.createClass({
  getInitialState: function () {
    return {
      widgets: [],
      lastWidgetId: 0
    };
  },

  addWidget: function (WidgetClass) {
    var widgets = this.state.widgets,
        lastWidgetId = this.state.lastWidgetId;

    widgets.push(
      React.createElement(
        WidgetClass,
        {
          key: lastWidgetId,
          widgetId: lastWidgetId
        }
      )
    );

    this.setState({
      widgets: widgets,
      lastWidgetId: lastWidgetId + 1
    });
  },

  removeWidget: function (widgetId) {
    var widgets = _.filter(this.state.widgets, function (widget) {
      return widget.props.widgetId !== widgetId;
    });

    this.setState({ widgets: widgets });
  },

  componentDidMount: function () {
    AppDispatcher.bind(Events.addWidget, function (WidgetClass) {
      this.addWidget(WidgetClass);
    }.bind(this));

    AppDispatcher.bind(Events.removeWidget, function (widgetId) {
      this.removeWidget(widgetId);
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
