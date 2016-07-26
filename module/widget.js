var Mixins = OS.Mixins,
    Widget = OS.Widget,
    Configurator = OS.Configurator;

// replace TODO by your name, code ...
var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getDefaultProps: function () {
    return {
      name: 'TODO',
      configuratorRefName: 'configurator'
    };
  },

  getInitialState: function () {
    return {
      size: {
        width: '150px',
        height: '100px'
      },
      position: global.Settings.get('default_position')
    };
  },

  getSettings: function () {
    return {
      size: _.clone(this.state.size),
      position: _.clone(this.state.position)
    };
  },

  componentWillMount: function () {
    this.init();
  },

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.getWidgetStyles() }>
        <Widget.DefaultIconsContainer
          onMouseDownPositionBtn={ this.handleStartMoving }
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this.openConfigurator }
        />

        <Widget.Body>
          <p className="lead">TODO</p>
        </Widget.Body>

        <Configurator.Default
          ref={ this.props.configuratorRefName }
          name={ this.props.name }
          settings={ this.getSettings() }
          onSubmit={ this.handleConfigure }
        />
      </Widget.Widget>
    );
  }
});

module.exports = _Widget;
