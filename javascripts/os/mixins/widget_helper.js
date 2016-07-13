var sprintf = require('sprintf-js').sprintf,

    globalSettings = require('../settings'),
    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),
    storage = require('../storage');

var WidgetHelper = {
  getWidgetStyles: function () {
    var size = this.state.size,
        position = this.state.position,

        styles = {
          position: 'absolute',
          width: size.width,
          height: size.height
        },

        xSide = position.xSide,
        ySide = position.ySide;

    styles[xSide] = this.state.position[xSide];
    styles[ySide] = this.state.position[ySide];

    return styles;
  },

  move: function (delta) {
    this.setState({
      position: this.getPositionByDelta(delta)
    });
  },

  handleStartMoving: function (e) {
    e.preventDefault();

    this.setState({
      startMovingX: e.pageX,
      startMovingY: e.pageY
    });

    document.addEventListener('mouseup', this.handleStopMoving);
    document.addEventListener('mousemove', this.handleMoving);
  },

  handleMoving: function (e) {
    var startMovingX = this.state.startMovingX,
        startMovingY = this.state.startMovingY;

    this.setState({
      startMovingX: e.pageX,
      startMovingY: e.pageY,
      position: this.getPositionByDelta({
        x: (e.pageX - startMovingX),
        y: (e.pageY - startMovingY)
      })
    });
  },

  handleStopMoving: function (e) {
    this.setState({
      startMovingX: null,
      startMovingY: null
    }, this.save);

    document.removeEventListener('mousemove', this.handleMoving);
    document.removeEventListener('mouseup', this.handleStopMoving);
  },

  getPositionByDelta: function (delta) {
    var position = this.state.position,
        xSide = position.xSide,
        ySide = position.ySide,

        xSideValue = parseInt(position[xSide].split('px')[0]),
        ySideValue = parseInt(position[ySide].split('px')[0]),

        deltaX = (xSide === 'left') ? delta.x : -1 * delta.x,
        deltaY = (ySide === 'top') ? delta.y : -1 * delta.y;

    position[xSide] = xSideValue + deltaX + 'px';
    position[ySide] = ySideValue + deltaY + 'px';

    return position;
  },

  close: function () {
    storage.remove(this.getStorageKey());
    AppDispatcher.removeWidget(this.props.widgetId);
  },

  openConfigurator: function () {
    var refName = this.props.configuratorRefName,
        ref = this.refs[refName];

    ref.open();
  },

  handleConfigure: function (settings) {
    this.setSettings(settings);
  },

  init: function () {
    this.load();
    AppDispatcher.initWidget(this);
  },

  load: function () {
    storage.get(
      this.getStorageKey(),
      function (settings) {
        if (settings) {
          this.setSettings(settings);
        }
      }.bind(this)
    );
  },

  save: function () {
    storage.set(
      this.getStorageKey(),
      this.getSettings()
    );
  },

  getStorageKey: function () {
    if (this.props.storageKey) {
      return this.props.storageKey;
    } else {
      return this._getDefaultStorageKey();
    }
  },

  _getDefaultStorageKey: function () {
    return sprintf(
      globalSettings.WIDGET_STORAGE_KEY,
      { id: this.props.widgetId }
    );
  }
};

module.exports = WidgetHelper;
