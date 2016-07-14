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