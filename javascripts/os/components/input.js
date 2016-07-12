var React = require('react');

var Input = React.createClass({
  getDefaultProps: function () {
    return {
      type: 'text',
      className: 'form-control',
      onChange: function () {}
    };
  },

  getInitialState: function () {
    return {
      value: this.getDefaultValue()
    };
  },

  handleChange: function (e) {
    var value = e.target.value;
    this.setState({
      value: value
    }, function () {
      this.props.onChange(value);
    }.bind(this));
  },

  clear: function () {
    this.setState({ value: this.getDefaultValue() });
  },

  getDefaultValue: function () {
    return this.props.value || this.props.defaultValue || '';
  },

  getValue: function () {
    return this.state.value;
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  },

  render: function () {
    return (
      <input
        type={ this.props.type }
        name={ this.props.name }
        className={ this.props.className }
        style={ this.props.style }
        placeholder={ this.props.placeholder }

        value={ this.state.value }
        onChange={ this.handleChange }
      />
    );
  }
});

module.exports = Input;
