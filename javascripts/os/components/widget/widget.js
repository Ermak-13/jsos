var React = require('react'),
    ReactDOM = require('react-dom'),
    scrollbar = require('perfect-scrollbar');

var Widget = React.createClass({
  componentDidMount: function () {
    scrollbar.initialize(
      this.getWidgetDOM()
    );
  },

  getWidgetDOM: function () {
    return ReactDOM.findDOMNode(this.refs.widget);
  },

  render: function () {
    return (
      <div
        ref="widget"
        className="widget"
        style={ this.props.widgetStyles }>

        { this.props.children }
      </div>
    );
  }
});

module.exports = Widget;
