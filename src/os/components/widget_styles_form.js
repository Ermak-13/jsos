var React = require('react'),
    _ = require('underscore'),
    HForm = require('./hform'),
    Input = require('./input');

var WidgetStylesForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var settings = _.extend(
      this.props.settings,
      {
        width: this.refs.width.getValue(),
        height: this.refs.height.getValue(),
        left: this.refs.left.getValue(),
        top: this.refs.top.getValue(),
        right: this.refs.right.getValue(),
        bottom: this.refs.bottom.getValue()
      }
    );

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      <HForm.Form onSubmit={ this.handleSubmit }>
        <HForm.Field
          labelText="width:">

          <Input
            ref="width"
            value={ settings.width }
          />
        </HForm.Field>

        <HForm.Field
          labelText="height:">

          <Input
            ref="height"
            value={ settings.height }
          />
        </HForm.Field>

        <HForm.Field
          labelText="left:">

          <Input
            ref="left"
            value={ settings.left }
          />
        </HForm.Field>

        <HForm.Field
          labelText="top:">

          <Input
            ref="top"
            value={ settings.top }
          />
        </HForm.Field>

        <HForm.Field
          labelText="right:">

          <Input
            ref="right"
            value={ settings.right }
          />
        </HForm.Field>

        <HForm.Field
          labelText="bottom:">

          <Input
            ref="bottom"
            value={ settings.bottom }
          />
        </HForm.Field>

        <HForm.Submit value="Save"/>
      </HForm.Form>
    );
  }
});

module.exports = WidgetStylesForm;
