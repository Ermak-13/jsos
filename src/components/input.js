var React = require('react');

var Input = React.createClass({
  getDefaultProps: function () {
    return {
      type: 'text',
      className: 'form-control'
    };
  },

  getInitialState: function () {
    return {
      value: this.getDefaultValue()
    };
  },

  handleChange: function (e) {
    var value = e.target.value;
    this.setState({ value: value });
  },

  getDefaultValue: function () {
    return this.props.value || this.props.defaultValue;
  },

  getValue: function () {
    return this.state.value;
  },

  render: function () {
    return (
      <input
        type={ this.props.type }
        name={ this.props.name }
        className={ this.props.className }

        value={ this.state.value }
        onChange={ this.handleChange }
      />
    );
  }
});

module.exports = Input;
