var React = require('react');

var Textarea = React.createClass({
  getDefaultProps: function () {
    return {
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
    this.setState({
      value: value
    }, function () {
      this.props.onChange(value);
    }.bind(this));
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
      <textarea
        name={ this.props.name }
        className={ this.props.className }
        style={ this.props.style }

        value={ this.state.value }
        onChange={ this.handleChange }
      />
    );
  }
});

module.exports = Textarea;
