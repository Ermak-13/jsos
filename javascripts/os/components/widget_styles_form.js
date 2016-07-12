var React = require('react'),
    _ = require('underscore'),

    Link = require('./link'),
    HForm = require('./hform'),
    Input = require('./input');

var WidgetStylesForm = React.createClass({
  getInitialState: function () {
    var settings = this.props.settings,
        xSide = (settings.left) ? 'left' : 'right',
        ySide = (settings.top) ? 'top' : 'bottom';

    return {
      xSide: xSide,
      left: settings.left,
      right: settings.right,
      ySide: ySide,
      top: settings.top,
      bottom: settings.bottom
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var settings = _.extend(
      this.props.settings,
      {
        width: this.refs.width.getValue(),
        height: this.refs.height.getValue(),
        left: this.state.left,
        top: this.state.top,
        right: this.state.right,
        bottom: this.state.bottom
      }
    );

    this.props.onSubmit(settings);
  },

  handleChangeXY: function (key, value) {
    var state = this.state;
    state[key] = value;

    this.setState(state);
  },

  handleExchangeXSide: function () {
    var xSide = this.state.xSide,
        nextXSide = (xSide === 'left') ? 'right' : 'left',

        xValue = this.state[xSide],
        state = this.state;

    state.xSide = nextXSide;
    state[xSide] = null;
    state[nextXSide] = xValue;

    this.setState(state);
  },

  handleExchangeYSide: function () {
    var ySide = this.state.ySide,
        nextYSide = (ySide === 'top') ? 'bottom' : 'top',

        yValue = this.state[ySide],
        state = this.state;

    state.ySide = nextYSide;
    state[ySide] = null;
    state[nextYSide] = yValue;

    this.setState(state);
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
          labelText="x:">

          <div className="input-group">
            <Input
              ref="left"
              disabled={ this.state.xSide !== 'left' }
              value={ this.state.left }
              onChange={ this.handleChangeXY.bind(this, 'left') }
            />

            <span className="input-group-addon">
              <Link onClick={ this.handleExchangeXSide }>
                <span className="fa fa-exchange" />
              </Link>
            </span>

            <Input
              ref="right"
              disabled={ this.state.xSide !== 'right' }
              value={ this.state.right }
              onChange={ this.handleChangeXY.bind(this, 'right') }
            />
          </div>
        </HForm.Field>

        <HForm.Field
          labelText="y:">

          <div className="input-group">
            <Input
              ref="top"
              disabled={ this.state.ySide !== 'top' }
              value={ this.state.top }
              onChange={ this.handleChangeXY.bind(this, 'top') }
            />

            <span className="input-group-addon">
              <Link onClick={ this.handleExchangeYSide }>
                <span className="fa fa-exchange" />
              </Link>
            </span>

            <Input
              ref="bottom"
              disabled={ this.state.ySide !== 'bottom' }
              value={ this.state.bottom }
              onChange={ this.handleChangeXY.bind(this, 'bottom') }
            />
          </div>
        </HForm.Field>

        <HForm.Submit value="Save"/>
      </HForm.Form>
    );
  }
});

module.exports = WidgetStylesForm;
