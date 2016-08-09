var React = require('react'),
    s = require('underscore.string'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Configurator = OS.Configurator,
    HForm = OS.HForm,
    Input = OS.Input,

    settings = require('./settings');

var _Configurator = React.createClass({
  mixins: [Mixins.ConfiguratorHelper, Mixins.NavHelper],

  getInitialState: function () {
    var settings = this.props.settings;

    return {
      left: settings.left,
      top: settings.top,
      right: settings.right,
      bottom: settings.bottom,
      vertical: settings.vertical,
      horizontal: settings.horizontal
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    this.props.onSubmit({
      left: this.state.left,
      top: this.state.top,
      right: this.state.right,
      bottom: this.state.bottom,
      vertical: this.state.vertical,
      horizontal: this.state.horizontal
    });
  },

  handleChangeVertical: function (key) {
    this.setState({
      left: true,
      top: false,
      right: false,
      bottom: false,
      vertical: true,
      horizontal: false,
    });
  },

  handleChangeHorizontal: function (key) {
    this.setState({
      left: false,
      top: true,
      right: false,
      bottom: false,
      vertical: false,
      horizontal: true
    });
  },

  handleChangeRadio: function (key) {
    var state = {
      left: false,
      top: false,
      right: false,
      bottom: false
    };
    state[key] = true;
    this.setState(state);
  },

  render: function () {
    var state = this.state;

    return (
      <Configurator.DefaultDialog
        ref={ this.getRefName() }
        name={ this.props.name }
        onClose={ this.props.onClose }>

        <HForm.Form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <div className="col-md-4 col-md-offset-2">
              { state.vertical && this.getPositionInputHTML('left') }
              { state.horizontal && this.getPositionInputHTML('top') }
              { state.vertical && this.getPositionInputHTML('right') }
              { state.horizontal && this.getPositionInputHTML('bottom') }
            </div>

            <div className="col-md-4">
              { this.getPositionInputHTML('vertical', this.handleChangeVertical) }
              { this.getPositionInputHTML('horizontal', this.handleChangeHorizontal) }
            </div>
          </div>

          <HForm.Submit
            submitContainerClassName="col-md-8 col-md-offset-2"
            value="Save"
          />
        </HForm.Form>

      </Configurator.DefaultDialog>
    );
  },

  getPositionInputHTML: function (key, onChange) {
    var checked = this.state[key],
        onChange = onChange || this.handleChangeRadio.bind(this, key);

    return (
      <div className="radio">
        <label>
          <input
            type="radio"
            checked={ checked }
            value={ checked ? 'on' : 'off' }
            onChange={ onChange }
          />
          { s.capitalize(key) }
        </label>
      </div>
    );
  }
});

module.exports = _Configurator;
