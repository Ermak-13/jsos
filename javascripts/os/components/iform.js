var React = require('react'),

    Input = require('./input');

var Form = React.createClass({
  getDefaultProps: function () {
    return {
      formClassName: 'form-inline'
    };
  },

  render: function () {
    return (
      <form
        className={ this.props.formClassName }
        onSubmit={ this.props.onSubmit }>

        { this.props.children }
      </form>
    );
  }
});

var Field = React.createClass({
  getDefaultProps: function () {
    return {
      containerClassName: 'form-group',
      labelClassName: 'sr-only'
    };
  },

  render: function () {
    return (
      <div className={ this.props.containerClassName }>
        <label className={ this.props.labelClassName }>
          { this.props.labelText }
          </label>

        { this.props.children }
      </div>
    );
  }
});

var Submit = React.createClass({
  getDefaultProps: function () {
    return {
      submitClassName: 'btn btn-primary'
    };
  },

  render: function () {
    return (
      <Input
        type="submit"
        className={ this.props.submitClassName }
        value={ this.props.value }
      />
    );
  }
});

module.exports = {
  Form: Form,
  Field: Field,
  Submit: Submit
};
