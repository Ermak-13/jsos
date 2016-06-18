var React = require('react');

var Input = require('./input');

var Submit = React.createClass({
  getDefaultProps: function () {
    return {
      className: 'btn btn-primary',
      value: 'Отправить'
    };
  },

  render: function () {
    return (
      <Input
        type="submit"
        className={ this.props.className }
        value={ this.props.value }
      />
    );
  }
});

module.exports = Submit;
