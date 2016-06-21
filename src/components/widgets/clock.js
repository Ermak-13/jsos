var React = require('react'),
    moment = require('moment'),
    _ = require('underscore'), 
    OS = require('os'),

    settings = OS.settings,
    AppDispatcher = OS.AppDispatcher,
    Events = OS.Events,
    Widget = OS.Widget,
    SettingsDialog = OS.SettingsDialog,
    WidgetStylesForm = OS.WidgetStylesForm,
    HForm = OS.HForm,
    Input = OS.Input;

var WIDGET_NAME = 'clock',
    OPEN_SETTINGS_DIALOG_EVENT = Events.openSettingsDialog(WIDGET_NAME),
    SAVE_SETTINGS_EVENT = Events.saveSettings(WIDGET_NAME);

var _Widget = React.createClass({
  getInitialState: function () {
    return {
      _moment: moment(),
      format: 'HH:mm',
      updatedInterval: 60 * 1000,

      widgetStyles: _.extend(
        settings.DEFAULT_WIDGET_STYLES,
        {
          width: '150px',
          height: '100px'
        }
      ),

      timeStyles: {
        height: '80px',
        lineHeight: '80px',
        textAlign: 'center',
        fontSize: '28px'
      }
    };
  },

  getTime: function () {
    return this.state._moment.format(
      this.state.format
    );
  },

  updateMoment: function () {
    this.setState({
      _moment: moment()
    });
  },

  openSettingsDialog: function () {
    AppDispatcher.trigger(OPEN_SETTINGS_DIALOG_EVENT, {
      format: this.state.format,
      updatedInterval: this.state.updatedInterval,
      widgetStyles: this.state.widgetStyles,
      timeStyles: this.state.timeStyles
    });
  },

  componentDidMount: function () {
    setInterval(
      this.updateMoment,
      this.state.updatedInterval
    );

    AppDispatcher.bind(SAVE_SETTINGS_EVENT, function (settings) {
      this.setState({
        format: settings.format,
        updatedInterval: settings.updatedInterval,
        widgetStyles: settings.widgetStyles,
        timeStyles: settings.timeStyles
      });
    }.bind(this));
  },

  render: function () {
    return (
      <Widget
        name={ WIDGET_NAME }
        widgetHeaderDisabled={ true }
        widgetStyles={ this.state.widgetStyles }
        openSettingsDialog={ this.openSettingsDialog }>

        <div style={ this.state.timeStyles }>
          { this.getTime() }
        </div>
      </Widget>
    );
  }
});

var _SettingsDialog = React.createClass({
  getInitialState: function () {
    return {
      tab: 'timeConfigs',
      settings: {
        widgetStyles: {},
        timeStyles: {}
      }
    };
  },

  handleNavTab: function (tab) {
    this.setState({ tab: tab });
  },

  save: function () {
    AppDispatcher.trigger(SAVE_SETTINGS_EVENT, this.state.settings);
  },

  getTabs: function () {
    var settings = this.state.settings,
        handlers = {
          timeConfigs: function (settings) {
            this.updateSettings(settings);
          }.bind(this),

          widgetStyles: function(widgetStyles) {
            var settings = this.state.settings;
            settings.widgetStyles = widgetStyles;

            this.updateSettings(settings);
          }.bind(this),

          timeStyles: function (timeStyles) {
            var settings = this.state.settings;
            settings.timeStyles = timeStyles;
            console.log(settings);

            this.updateSettings(settings);
          }.bind(this)
        };

    return {
      timeConfigs: {
        navText: 'Time Configs',
        content: function () {
          return (
            <TimeConfigsForm
              onSubmit={ handlers.timeConfigs }
              settings={ settings }
            />
          );
        }.bind(this) (),
      },

      widgetStyles: {
        navText: 'Widgets Styles',
        content: function () {
          return (
            <WidgetStylesForm
              onSubmit={ handlers.widgetStyles }
              settings={ settings.widgetStyles }
            />
          );
        }.bind(this) ()
      },

      timeStyles: {
        navText: 'Time Styles',
        content: function () {
          return (
            <TimeStylesForm
              onSubmit={ handlers.timeStyles }
              settings={ settings.timeStyles }
            />
          );
        }.bind(this) ()
      }
    };
  },

  isActive: function (tab) {
    return tab === this.state.tab;
  },

  componentDidMount: function () {
    AppDispatcher.bind(OPEN_SETTINGS_DIALOG_EVENT, function (settings) {
      this.refs.dialog.open();

      this.setState({ settings: settings });
    }.bind(this));
  },

  render: function () {
    return (
      <SettingsDialog
        ref="dialog"
        name="clock">

        { this.getNavHTML() }

        <div className="row" style={{ marginTop: '20px' }}>
          <div className="col-md-10 col-md-offset-1">
            { this.getContentHTML() }
          </div>
        </div>
      </SettingsDialog>
    );
  },

  getNavHTML: function () {
    var liHTML = _.map(this.getTabs(), function (options, tab) {
      var className = this.isActive(tab) ? 'active' : '';

      return (
        <li key={ tab } className={ className }>
          <a href="#" onClick={ this.handleNavTab.bind(this, tab) }>
            { options.navText }
          </a>
        </li>
      );
    }.bind(this));

    return (
      <ul className="nav nav-tabs mini-nav">
        { liHTML }
      </ul>
    );
  },

  getContentHTML: function () {
    return this.getTabs()[this.state.tab].content;
  }
});

var TimeConfigsForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var settings = _.extend(
      this.props.settings,
      {
        format: this.refs.format.getValue(),
        updatedInterval: this.refs.updatedInterval.getValue()
      }
    );

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      <HForm.Form onSubmit={ this.handleSubmit }>
        <HForm.Field
          labelText="format:">

          <Input
            ref="format"
            value={ settings.format }
          />
        </HForm.Field>

        <HForm.Field
          labelText="updated interval:">

          <Input
            type="number"
            ref="updatedInterval" 
            value={ settings.updatedInterval }
          />
        </HForm.Field>

        <HForm.Submit value="Save" />
      </HForm.Form>
    );
  }
});

var TimeStylesForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var settings = _.extend(
      this.props.settings,
      {
        height: this.refs.height.getValue(),
        lineHeight: this.refs.lineHeight.getValue(),
        fontSize: this.refs.fontSize.getValue()
      }
    );

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      <HForm.Form onSubmit={ this.handleSubmit }>
        <HForm.Field
          labelText="height:">

          <Input
            ref="height"
            value={ settings.height }
          />
        </HForm.Field>

        <HForm.Field
          labelText="line height:">

          <Input
            ref="lineHeight"
            value={ settings.lineHeight }
          />
        </HForm.Field>

        <HForm.Field
          labelText="font size:">

          <Input
            ref="fontSize"
            value={ settings.fontSize }
          />
        </HForm.Field>

        <HForm.Submit value="Save" />
      </HForm.Form>
    );
  }
});

module.exports = {
  Widget: _Widget,
  SettingsDialog: _SettingsDialog
}
