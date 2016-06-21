var React = require('react'),
    HForm = require('./hform'),
    Input = require('./input');

var WidgetStylesForm = React.createClass({
  render: function () {
    var settings = this.props.settings;

    return (
      <HForm.Form>
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
