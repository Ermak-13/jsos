var React = require('react');

var Option = React.createClass({
  render: function () {
    return (
      <option value={ this.props.value }>
        { this.props.text }
      </option>
    );
  }
});

module.exports = Option;
