(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Widget = require('./widget');

// replace TODO by your module name
OS.installModule('TODO', {
  Widget: Widget
});


},{"./widget":2}],2:[function(require,module,exports){
(function (global){
var Mixins = OS.Mixins,
    Widget = OS.Widget,
    Configurator = OS.Configurator;

var _Widget = React.createClass({displayName: "_Widget",
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
      React.createElement(Widget.Widget, {widgetStyles:  this.getWidgetStyles() }, 
        React.createElement(Widget.DefaultIconsContainer, {
          onMouseDownPositionBtn:  this.handleStartMoving, 
          onClickCloseBtn:  this.close, 
          onClickConfigureBtn:  this.openConfigurator}
        ), 

        React.createElement(Widget.Body, null, 
          React.createElement("p", {className: "lead"}, "TODO")
        ), 

        React.createElement(Configurator.Default, {
          ref:  this.props.configuratorRefName, 
          name:  this.props.name, 
          settings:  this.getSettings(), 
          onSubmit:  this.handleConfigure}
        )
      )
    );
  }
});

module.exports = _Widget;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])