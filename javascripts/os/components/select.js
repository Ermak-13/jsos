var React = require('react');

var Select = React.createClass({
  getDefaultProps: function () {
    return {
      className: 'form-control',
      onChange: function (value) {}
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

  render: function () {
    return (
      <select
        className={ this.props.className }
        value={ this.state.value }
        onChange={ this.handleChange }>

        { this.props.children }
      </select>
    );
  }
});

module.exports = Select;
