var React = require('react'),
    Input = require('./input');

var Form = React.createClass({
  getDefaultProps: function () {
    return {
      formClassName: 'form-horizontal'
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

var HFormField = React.createClass({
  getDefaultProps: function () {
    return {
      containerClassName: 'form-group',
      containerStyle: {},
      labelClassName: 'control-label col-md-4',
      controlContainerClassName: 'col-md-8'
    };
  },

  render: function () {
    return (
      <div
        className={ this.props.containerClassName }
        style={ this.props.containerStyle }>

        <Label
          className={ this.props.labelClassName }
          text={ this.props.labelText }
        />

        <div className={ this.props.controlContainerClassName }>
          { this.props.children }
        </div>
      </div>
    );
  }
});

var HFormSubmit = React.createClass({
  getDefaultProps: function () {
    return {
      containerClassName: 'form-group',
      submitContainerClassName: 'col-md-8 col-md-offset-4',
      submitClassName: 'btn btn-primary'
    };
  },

  render: function () {
    return (
      <div className={ this.props.containerClassName }>
        <div className={ this.props.submitContainerClassName }>
          <Input
            type="submit"
            className={ this.props.submitClassName }
            value={ this.props.value }
          />
        </div>
      </div>
    );
  }
});

var Label = React.createClass({
  render: function () {
    return (
      <label className={ this.props.className }>
        { this.props.text }
      </label>
    );
  }
});

module.exports = {
  Form: Form,
  Field: HFormField,
  Submit: HFormSubmit
};
