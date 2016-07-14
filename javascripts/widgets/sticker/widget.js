var React = require('react'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Widget = OS.Widget,

    IForm = OS.IForm,
    Textarea = OS.Textarea,

    settings = require('./settings');

var _Widget = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getInitialState: function () {
    return {
      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION,
      widgetStyles: settings.DEFAULT_WIDGET_STYLES,

      textareaStyles: settings.DEFAULT_TEXTAREA_STYLES
    };
  },

  setSettings: function (settings) {
    this.setState({
      size: settings.size,
      position: settings.position,
      widgetStyles: settings.widgetStyles,
      textareaStyles: settings.textareaStyles
    }, this.saveSettings);
  },

  getSettings: function () {
    return {
      size: _.clone(this.state.size),
      position: _.clone(this.state.position),
      widgetStyles: _.clone(this.state.widgetStyles),
      textareaStyles: _.clone(this.state.textareaStyles)
    };
  },

  componentWillMount: function () {
    this.load();
  },

  render: function () {
    return (
      <Widget.Widget widgetStyles={ this.getWidgetStyles() }>
        <Widget.DefaultIconsContainer
          onMouseDownPositionBtn={ this.handleStartMoving }
          onClickCloseBtn={ this.close }
          onClickConfigureBtn={ this.openConfigurator }
        />

          <IForm.Form>
            <IForm.Field
              labelText="message">
              <Textarea
                style={ this.state.textareaStyles }
              />
            </IForm.Field>
          </IForm.Form>
      </Widget.Widget>
    );
  }
});

module.exports = _Widget;
