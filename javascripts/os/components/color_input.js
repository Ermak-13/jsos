var React = require('react'),
    SketchPicker = require('react-color').SketchPicker;

var ColorInput = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.value
    };
  },

  handleChangeComplete: function (color) {
    this.setState({ value: color.hex });
  },

  getValue: function () {
    return this.state.value;
  },

  render: function () {
    return (
      <SketchPicker
        color={ this.props.value }
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
});
module.exports = ColorInput;
