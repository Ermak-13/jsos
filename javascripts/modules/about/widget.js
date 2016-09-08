var React = require('react'),
    s = require('underscore.string'),

    OS = require('os'),
    Widget = OS.Widget,
    Mixins = OS.Mixins,

    settings = require('./settings');

var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getInitialState: function() {
    return {
      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION
    };
  },

  _getSettings: function () {
    return {
      size: this.state.size,
      position: this.state.position
    };
  },

  componentWillMount: function() {
    this.init();
  },

  render: function() {
    console.log(this.props);
    return (
      <Widget.Widget widgetStyles={ this.getWidgetStyles() }>
        <Widget.DefaultHeader
          title="About JSOS"
          onMouseDownPositionBtn={ this.handleStartMoving }
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this.openConfigurator }
        />

        <Widget.Body>
          <p className="text-center" style={{ fontSize: '16px' }}>
            <strong> Javascript Operation System</strong>
          </p>

          <p className="text-center">
            Website: <a href="https://github.com/Ermak-13/jsos">
                <strong>Github Page</strong>
              </a>
          </p>

          <p className="text-center">
            License: <a href="https://raw.githubusercontent.com/Ermak-13/jsos/master/COPYING">
              <strong>GPLv3</strong>
              </a>
          </p>
        </Widget.Body>
      </Widget.Widget>
    );
  }
});

module.exports = _Widget;
